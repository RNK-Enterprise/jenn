"use client";

import { useState } from "react";
import {
  RESOURCE_CATEGORIES,
  US_STATES,
  getLocalResourceLinks,
} from "@/lib/localResources";

export default function ResourceLocator() {
  const [state, setState] = useState("");
  const [category, setCategory] = useState(RESOURCE_CATEGORIES[0].id);
  const [results, setResults] = useState<ReturnType<
    typeof getLocalResourceLinks
  > | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state) return;
    setResults(getLocalResourceLinks(state, category));
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        Find resources near you
      </p>
      <h2 className="mt-2 font-serif text-2xl text-ink">
        Bridge with Jenn is one part of the picture
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
        For legal aid, classes, counseling, and financial help, we point you
        to trusted national directories rather than guessing at local
        listings ourselves, that way what you find is current and correct.
      </p>

      <div className="mt-5 rounded-2xl bg-clay/8 border border-clay/25 p-4 text-sm">
        <span className="font-semibold text-clay-dark">
          In crisis right now?
        </span>{" "}
        <span className="text-foreground-muted">
          Call or text{" "}
          <a href="tel:1-800-799-7233" className="font-semibold text-ink underline">
            1-800-799-7233
          </a>{" "}
          (National Domestic Violence Hotline) or{" "}
          <a href="tel:988" className="font-semibold text-ink underline">
            988
          </a>{" "}
          (Suicide & Crisis Lifeline). Both free, confidential, 24/7.
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Your state
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          >
            <option value="" disabled>
              Select a state
            </option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          What are you looking for?
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          >
            {RESOURCE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full bg-sage px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-sage-dark"
        >
          Search
        </button>
      </form>

      {results && (
        <div className="mt-6 flex flex-col gap-3">
          {results.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-0.5 rounded-xl border border-border bg-surface-muted px-4 py-3 transition-colors hover:border-sage/50"
            >
              <span className="font-semibold text-ink">
                {r.name} <span aria-hidden>↗</span>
              </span>
              <span className="text-sm text-foreground-muted">
                {r.detail}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
