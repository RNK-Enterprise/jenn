import { NextResponse } from "next/server";

type IntakePayload = {
  parent: "a" | "b";
  name: string;
  email: string;
  coreIssue: string;
  triedAlready: string;
  winForKid: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<IntakePayload>;

  if (
    !body.parent ||
    !body.name ||
    !body.email ||
    !body.coreIssue ||
    !body.triedAlready ||
    !body.winForKid
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // PROTOTYPE: log the submission instead of persisting it.
  // Production: POST this payload to Airtable (one row per parent, keyed by
  // a shared family/case ID) so Jenn gets an email digest and can read both
  // sides side-by-side before the call. Airtable's REST API + a Zapier or
  // native "email on new record" automation covers the notification.
  console.log("[intake submission]", body);

  return NextResponse.json({ ok: true });
}
