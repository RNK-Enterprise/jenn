"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const presets = [
  { value: 0, label: "$0", sub: "I'm in crisis" },
  { value: 15, label: "$15", sub: "" },
  { value: 30, label: "$30", sub: "" },
  { value: 50, label: "$50", sub: "Supports another family" },
];

export default function DonatePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(30);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = custom !== "" ? Number(custom) : selected;

  function handleCheckout() {
    if (amount === null || Number.isNaN(amount)) return;
    setLoading(true);
    // PROTOTYPE: no live Stripe keys configured.
    // Production: POST { amount } to /api/checkout, which creates a Stripe
    // Checkout Session server-side and returns session.url to redirect to.
    setTimeout(() => {
      router.push(`/thank-you?from=donate&amount=${amount}`);
    }, 600);
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        Keep the bridge open
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Donate</h1>
      <p className="mt-3 text-foreground-muted">
        100% of your donation goes to keeping this bridge open: no
        corporate overhead, no ads, no algorithm deciding who gets heard.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {presets.map((preset) => {
          const active = selected === preset.value && custom === "";
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => {
                setSelected(preset.value);
                setCustom("");
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-4 py-5 transition-colors ${
                active
                  ? "border-clay bg-clay/10"
                  : "border-border bg-surface hover:border-clay/50"
              }`}
            >
              <span
                className={`text-2xl font-serif italic ${
                  active ? "text-clay-dark" : "text-ink"
                }`}
              >
                {preset.label}
              </span>
              {preset.sub && (
                <span className="text-xs text-foreground-muted">
                  {preset.sub}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <label className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-ink">
        Or enter a custom amount
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 focus-within:border-clay focus-within:ring-2 focus-within:ring-clay/20">
          <span className="text-foreground-muted">$</span>
          <input
            type="number"
            min={0}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom amount"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </label>

      <button
        onClick={handleCheckout}
        disabled={amount === null || Number.isNaN(amount) || loading}
        className="mt-8 w-full rounded-full bg-clay px-7 py-3.5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Redirecting to checkout…"
          : amount === 0
            ? "Continue, no payment needed"
            : `Donate $${amount ?? ""}`}
      </button>

      <p className="mt-4 text-center text-xs text-foreground-muted">
        Secure checkout powered by Stripe. Card details never touch our
        servers.
      </p>
    </section>
  );
}
