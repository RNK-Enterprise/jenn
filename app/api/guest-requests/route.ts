import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const pitch = String(body.pitch ?? "").trim();

  if (!name || !email || !pitch) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // PROTOTYPE: logs instead of persisting.
  // Production: send to Airtable ("Guest Requests" table) so Jenn can screen
  // pitches before booking anyone into a recording slot.
  console.log("[guest request]", {
    name,
    email,
    pitch: pitch.slice(0, 2000),
    link: body.link || null,
  });

  return NextResponse.json({ ok: true });
}
