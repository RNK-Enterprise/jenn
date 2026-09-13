import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

type Review = {
  id: string;
  rating: number;
  text: string;
  name: string | null;
  createdAt: string;
  approved: boolean;
};

// PROTOTYPE: in-memory store, resets whenever the dev server restarts and
// isn't shared across serverless instances in production.
// Production: persist to Airtable (or a real DB). The `approved` flag carries
// over: submissions land unapproved and only JOIN-approved rows render.
const reviews: Review[] = [];

// Moderation actions are gated by a shared secret (curl -X PATCH
// -H "x-moderation-token: $REVIEWS_MODERATION_TOKEN" ...). With the env var
// unset the endpoint is disabled rather than open — flip-open by default is
// exactly the spam/abuse hole this gate exists to close.
function moderationEnabled(): string | null {
  const token = process.env.REVIEWS_MODERATION_TOKEN;
  return token && token.length > 0 ? token : null;
}

function tokenMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// GET serves the public list: approved reviews only. Submissions sit in the
// queue until a moderator approves them via PATCH below.
// A valid x-moderation-token header additionally returns the pending queue —
// otherwise there'd be no way to discover the ids to approve/reject.
export async function GET(request: Request) {
  const expected = moderationEnabled();
  const isModerator =
    !!expected &&
    tokenMatches(request.headers.get("x-moderation-token"), expected);
  if (isModerator) {
    const queue = reviews.filter((r) => !r.approved);
    return NextResponse.json({
      reviews: [...reviews.filter((r) => r.approved)].reverse(),
      queue,
    });
  }
  const approved = reviews.filter((r) => r.approved);
  return NextResponse.json({ reviews: [...approved].reverse() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const rating = Number(body.rating);
  const text = String(body.text ?? "").trim();
  const anonymous = Boolean(body.anonymous);
  const name = anonymous ? null : String(body.name ?? "").trim() || null;

  if (!rating || rating < 1 || rating > 5 || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const review: Review = {
    id: crypto.randomUUID(),
    rating,
    text: text.slice(0, 1000),
    name,
    createdAt: new Date().toISOString(),
    approved: false, // every submission starts in the moderation queue
  };
  reviews.push(review);

  // Deliberately no review in the response: the submitter never receives
  // unapproved content, and nothing renders anywhere until it's approved.
  return NextResponse.json({ ok: true, queued: true });
}

// Moderation: approve or reject a queued review.
//   PATCH { id, action: "approve" | "reject" }
// Requires the x-moderation-token header matching REVIEWS_MODERATION_TOKEN.
export async function PATCH(request: Request) {
  const expected = moderationEnabled();
  if (!expected) {
    return NextResponse.json(
      { error: "Moderation disabled: set REVIEWS_MODERATION_TOKEN" },
      { status: 503 },
    );
  }
  if (!tokenMatches(request.headers.get("x-moderation-token"), expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const id = String(body.id ?? "");
  const action = body.action;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json(
      { error: "action must be 'approve' or 'reject'" },
      { status: 400 },
    );
  }

  const review = reviews.find((r) => r.id === id);
  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  if (action === "approve") {
    review.approved = true;
    return NextResponse.json({ ok: true, review });
  }
  // reject: drop it entirely — the queue never serves rejected content
  const index = reviews.findIndex((r) => r.id === id);
  reviews.splice(index, 1);
  return NextResponse.json({ ok: true, rejected: id });
}
