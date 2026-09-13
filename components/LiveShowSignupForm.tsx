"use client";

import { useState, type FormEvent } from "react";

export default function LiveShowSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Name and email so we can send the call-in link.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/live-show-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, question }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
      setName("");
      setEmail("");
      setQuestion("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white/10 border border-white/20 p-5 text-center">
        <p className="font-serif text-lg italic text-cream">
          You&apos;re on the list.
        </p>
        <p className="mt-1 text-sm text-cream/70">
          We&apos;ll email the call-in link before we go live.
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
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-cream placeholder:text-cream/50 outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-cream placeholder:text-cream/50 outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
        />
      </div>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="A question you'd want to ask live (optional)"
        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-cream placeholder:text-cream/50 outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
      />
      {error && <p className="text-sm text-clay">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-sky px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Get the call-in link"}
      </button>
    </form>
  );
}
