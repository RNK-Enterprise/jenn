import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const business = String(body.business ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // PROTOTYPE: logs instead of persisting.
  // Production: send to Airtable ("Sponsor Requests" table) and notify
  // Jenn by email so she can follow up with rates and available slots.
  console.log("[sponsor request]", {
    name,
    email,
    business: business || null,
    message: message.slice(0, 2000) || null,
  });

  return NextResponse.json({ ok: true });
}
