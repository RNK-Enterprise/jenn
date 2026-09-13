"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Props = {
  parent: "a" | "b";
};

const accent = {
  a: {
    ring: "focus:border-clay focus:ring-clay/20",
    button: "bg-clay hover:bg-clay-dark",
    badge: "bg-clay/12 text-clay-dark",
  },
  b: {
    ring: "focus:border-sage focus:ring-sage/20",
    button: "bg-sage hover:bg-sage-dark",
    badge: "bg-sage/12 text-sage-dark",
  },
} as const;

export default function IntakeForm({ parent }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = accent[parent];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      parent,
      name: form.get("name"),
      email: form.get("email"),
      coreIssue: form.get("coreIssue"),
      triedAlready: form.get("triedAlready"),
      winForKid: form.get("winForKid"),
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/thank-you?from=intake");
    } catch {
      setError("Something went wrong sending that. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Your name
          <input
            name="name"
            required
            className={`rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none ${theme.ring} focus:ring-2`}
            placeholder="First name is fine"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Your email
          <input
            name="email"
            type="email"
            required
            className={`rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none ${theme.ring} focus:ring-2`}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        What&apos;s the core issue, from where you sit?
        <textarea
          name="coreIssue"
          required
          rows={3}
          className={`rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none ${theme.ring} focus:ring-2`}
          placeholder="In a few sentences, what's actually going on?"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        What have you already tried?
        <textarea
          name="triedAlready"
          required
          rows={3}
          className={`rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none ${theme.ring} focus:ring-2`}
          placeholder="Conversations, texts, boundaries, anything you've tried so far"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        What does a win look like for your kid?
        <textarea
          name="winForKid"
          required
          rows={3}
          className={`rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none ${theme.ring} focus:ring-2`}
          placeholder="If this went well, what would be different for them?"
        />
      </label>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={`self-start rounded-full px-7 py-3 font-semibold text-white shadow-sm transition-colors disabled:opacity-60 ${theme.button}`}
      >
        {submitting ? "Sending…" : "Send to Jenn, privately"}
      </button>
      <p className="text-xs text-foreground-muted">
        Only Jenn reads this. It is not shared with the other parent.
      </p>
    </form>
  );
}
