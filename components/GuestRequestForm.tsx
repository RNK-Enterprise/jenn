"use client";

import { useState, type FormEvent } from "react";

export default function GuestRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [pitch, setPitch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || pitch.trim().length < 10) {
      setError("Fill in your name, email, and a sentence or two about what you'd bring.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/guest-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, link, pitch }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
      setName("");
      setEmail("");
      setLink("");
      setPitch("");
    } catch {
      setError("Something went wrong sending that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-sky/10 border border-sky/25 p-6 text-center">
        <p className="font-serif text-lg italic text-sky-dark">
          Thanks for reaching out.
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Jenn reviews guest requests before booking a recording slot. If
          it&apos;s a fit, you&apos;ll hear back by email.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-sky-dark hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-sky focus:ring-2 focus:ring-sky/20"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-sky focus:ring-2 focus:ring-sky/20"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Website or social link <span className="font-normal text-foreground-muted">(optional)</span>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="So Jenn can see your background"
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-sky focus:ring-2 focus:ring-sky/20"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        What would you bring to the conversation?
        <textarea
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          rows={3}
          required
          placeholder="Your background, the angle you'd bring, or a specific episode topic you'd be great for..."
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-sky focus:ring-2 focus:ring-sky/20"
        />
      </label>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-sky px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-dark disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Request to be a guest"}
      </button>
    </form>
  );
}
