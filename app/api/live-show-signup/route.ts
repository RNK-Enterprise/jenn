import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // PROTOTYPE: logs instead of persisting.
  // Production: add to an email/SMS reminder list for the next live show
  // date, and optionally queue their submitted question for the call-in
  // segment.
  console.log("[live show signup]", {
    name,
    email,
    question: body.question || null,
  });

  return NextResponse.json({ ok: true });
}
