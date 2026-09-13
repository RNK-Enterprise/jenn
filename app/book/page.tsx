"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function getTomorrowSlots() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateLabel = tomorrow.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hours = [9, 13, 17]; // 9am, 1pm, 5pm: spread across the day
  const slots = hours.map((hour) => {
    const slot = new Date(tomorrow);
    slot.setHours(hour, 0, 0, 0);
    return slot.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  });

  return { dateLabel, slots };
}

export default function BookPage() {
  const router = useRouter();
  const { dateLabel, slots } = useMemo(getTomorrowSlots, []);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    // PROTOTYPE: no calendar backend wired up yet.
    // Production: create the hold in Jenn's calendar (Cal.com / Google
    // Calendar API) and send confirmation email + reminder text.
    setTimeout(() => {
      router.push("/thank-you?from=booking");
    }, 500);
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        Need to talk today?
      </p>
      <h1 className="mt-3 font-serif text-3xl text-ink">
        Book a 45-minute session
      </h1>
      <p className="mt-3 text-foreground-muted">
        No calendar maze. Pick one of three open slots for{" "}
        <span className="font-semibold text-ink">{dateLabel}</span> and
        you&apos;re on Jenn&apos;s calendar.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {slots.map((slot) => {
            const active = selectedSlot === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-xl border px-4 py-4 text-center font-semibold transition-colors ${
                  active
                    ? "border-clay bg-clay/10 text-clay-dark"
                    : "border-border bg-surface text-ink hover:border-clay/50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
            Your name
            <input
              required
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
            Your email
            <input
              type="email"
              required
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!selectedSlot || submitting}
          className="self-start rounded-full bg-clay px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Booking…"
            : selectedSlot
              ? `Confirm ${selectedSlot}`
              : "Pick a time above"}
        </button>

        <p className="text-xs text-foreground-muted">
          Haven&apos;t shared your side yet? You can still book, just{" "}
          <Link href="/share-your-side" className="underline hover:text-clay-dark">
            fill Jenn in
          </Link>{" "}
          before your session so she walks in prepared.
        </p>
      </form>
    </section>
  );
}
