"use client";

import { useState, type FormEvent } from "react";

export default function PodcastPitchForm() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (topic.trim().length < 5) {
      setError("Give us a sentence or two to work with.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/podcast-pitches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, email }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
      setTopic("");
      setName("");
      setEmail("");
    } catch {
      setError("Something went wrong sending that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-sage/10 border border-sage/25 p-6 text-center">
        <p className="font-serif text-lg italic text-sage-dark">
          Got it, thank you.
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Your idea goes straight into the pile Jenn pulls from when she
          plans the next batch of episodes.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-clay-dark hover:underline"
        >
          Submit another idea
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        What should we talk about?
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          required
          placeholder="A topic, a question, a situation you want us to unpack..."
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Name <span className="font-normal text-foreground-muted">(optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Stays off-air unless you say otherwise"
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Email <span className="font-normal text-foreground-muted">(optional)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="If you want to know when it airs"
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </label>
      </div>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Submit topic idea"}
      </button>
      <p className="text-xs text-foreground-muted">
        Topics are never attributed to you on air unless you tell us it&apos;s
        okay.
      </p>
    </form>
  );
}
