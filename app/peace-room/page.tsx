"use client";

import Image from "next/image";
import { useState } from "react";

export default function PeaceRoomPage() {
  const [joined, setJoined] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        The Peace Room
      </p>
      <h1 className="mt-3 font-serif text-3xl text-ink">
        A guided space built for de-escalation
      </h1>
      <p className="mt-3 max-w-2xl text-foreground-muted">
        This is where sessions happen: video, hosted by Jenn, with one
        feature that makes it different from a normal call. Either parent can
        pause the whole conversation, instantly, no questions asked.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-ink shadow-sm">
        <div className="relative grid grid-cols-1 gap-1 bg-ink/80 p-1 sm:grid-cols-3">
          {[
            { label: "Jenn", accent: "bg-sage/25 text-sage" },
            { label: "Parent A", accent: "bg-clay/25 text-clay" },
            { label: "Parent B", accent: "bg-slate-500/25 text-slate-300" },
          ].map((tile) => (
            <div
              key={tile.label}
              className={`flex h-40 flex-col items-center justify-center gap-2 rounded-2xl sm:h-56 ${
                joined ? "bg-black/30" : "bg-black/20"
              }`}
            >
              {tile.label === "Jenn" ? (
                <span className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-sage/40">
                  <Image
                    src="/jenn.jpg"
                    alt="Jenn"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </span>
              ) : (
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full font-serif text-lg italic ${tile.accent}`}
                >
                  {tile.label[0]}
                </span>
              )}
              <span className="text-sm font-medium text-cream/80">
                {tile.label}
              </span>
              {!joined && (
                <span className="text-xs text-cream/40">
                  waiting to join…
                </span>
              )}
            </div>
          ))}

          {paused && (
            <div className="absolute inset-1 flex flex-col items-center justify-center gap-2 rounded-2xl bg-ink/95 text-center">
              <span className="text-2xl">⏸</span>
              <p className="font-serif text-lg italic text-cream">
                Session paused
              </p>
              <p className="max-w-sm text-sm text-cream/70">
                Someone used the Safe Word. Jenn has stepped in, take a
                breath. The conversation will resume when everyone is ready.
              </p>
              <button
                onClick={() => setPaused(false)}
                className="mt-2 rounded-full bg-sage px-5 py-2 text-sm font-semibold text-white hover:bg-sage-dark"
              >
                Ready to resume
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-ink px-5 py-4">
          <div className="flex items-center gap-3">
            {!joined ? (
              <button
                onClick={() => setJoined(true)}
                className="rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark"
              >
                Join session
              </button>
            ) : (
              <button
                onClick={() => setJoined(false)}
                className="rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream/80 hover:border-cream/60"
              >
                Leave
              </button>
            )}
          </div>

          <button
            disabled={!joined}
            onClick={() => setPaused(true)}
            className="flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden>🛑</span> Safe Word: Pause
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface-muted p-6 text-sm text-foreground-muted">
        <p className="font-semibold text-ink">Behind the scenes</p>
        <p className="mt-1">
          This prototype mocks the video experience. In production, this room
          connects to a LiveKit room via a small self-hosted SFU ($6/mo VPS),
          with the Safe Word button calling a server action that mutes all
          participants and pings Jenn, not just a UI toggle.
        </p>
      </div>
    </section>
  );
}
