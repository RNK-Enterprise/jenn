"use client";

import { useEffect, useState, type FormEvent } from "react";

type Review = {
  id: string;
  rating: number;
  text: string;
  name: string | null;
  createdAt: string;
};

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={`text-lg leading-none ${
            n <= value ? "text-clay" : "text-border"
          } ${onChange ? "cursor-pointer" : "cursor-default"}`}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (rating === 0) {
      setError("Choose a star rating first.");
      return;
    }
    if (text.trim().length < 5) {
      setError("Say a little more about your experience.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text, anonymous, name }),
      });
      if (!res.ok) throw new Error("failed");
      setRating(0);
      setText("");
      setName("");
      setAnonymous(true);
      setThanks(true);
    } catch {
      setError("Something went wrong posting that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
            From families who&apos;ve used Bridge with Jenn
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink">Session reviews</h2>
        </div>
        {average && (
          <div className="flex items-center gap-2">
            <Stars value={Math.round(Number(average))} />
            <span className="text-sm text-foreground-muted">
              {average} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
        You can post anonymously, no name or email required. Reviews appear
        after a quick moderation check; we don&apos;t edit them.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface-muted p-5">
        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">
            Your rating
          </span>
          <Stars value={rating} onChange={setRating} />
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Your review
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="What was your experience like?"
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-clay"
            />
            Post anonymously
          </label>
          {!anonymous && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
            />
          )}
        </div>

        {error && <p className="text-sm text-clay-dark">{error}</p>}
        {thanks && !error && (
          <p className="text-sm text-sage-dark">
            Thank you — your review was received and is waiting for a quick
            check before it appears below.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post review"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        {!loaded && (
          <p className="text-sm text-foreground-muted">Loading reviews…</p>
        )}
        {loaded && reviews.length === 0 && (
          <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-foreground-muted">
            No reviews yet, be the first to share how your session went.
          </p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between">
              <Stars value={r.rating} />
              <span className="text-xs text-foreground-muted">
                {new Date(r.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink">{r.text}</p>
            <p className="mt-1 text-xs font-semibold text-foreground-muted">
              {r.name ?? "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
