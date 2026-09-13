import { NextResponse } from "next/server";

type Pitch = {
  topic: string;
  name: string | null;
  email: string | null;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Pitch>;
  const topic = String(body.topic ?? "").trim();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  // PROTOTYPE: logs instead of persisting.
  // Production: send to Airtable alongside the intake table (or a simple
  // "Episode Ideas" base) so Jenn can scan submissions when planning the
  // next recording batch.
  console.log("[podcast pitch]", {
    topic: topic.slice(0, 2000),
    name: body.name || null,
    email: body.email || null,
  });

  return NextResponse.json({ ok: true });
}
