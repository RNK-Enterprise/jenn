"use client";

import { useState, type FormEvent } from "react";

export default function SponsorRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Name and email so Jenn can follow up.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/sponsor-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business, message }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
      setName("");
      setEmail("");
      setBusiness("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-clay/8 border border-clay/25 p-5 text-center">
        <p className="font-serif text-lg italic text-clay-dark">
          Thanks for asking.
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Jenn will follow up by email with rates and open slots.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
      </div>
      <input
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        placeholder="Business or practice name (optional)"
        className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        placeholder="Anything else Jenn should know (optional)"
        className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
      />
      {error && <p className="text-sm text-clay-dark">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Ask about sponsoring"}
      </button>
    </form>
  );
}
