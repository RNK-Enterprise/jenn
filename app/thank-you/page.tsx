import Link from "next/link";

const copyByType: Record<
  string,
  { eyebrow: string; heading: string; body: string }
> = {
  intake: {
    eyebrow: "Sent, privately",
    heading: "Jenn has your side of the story",
    body: "She won't share it with the other parent. If you haven't booked a session yet, do that next: Jenn will already be prepped when you get on the call.",
  },
  booking: {
    eyebrow: "You're on the calendar",
    heading: "See you soon",
    body: "A confirmation is on its way to your email. One more thing before your session: it makes a real difference.",
  },
  donate: {
    eyebrow: "Thank you",
    heading: "That keeps the bridge open",
    body: "Every dollar goes straight to making sessions possible for families who need one. No corporate overhead, ever.",
  },
  default: {
    eyebrow: "Thank you",
    heading: "You're all set",
    body: "We'll be in touch shortly.",
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; amount?: string }>;
}) {
  const { from, amount } = await searchParams;
  const copy = copyByType[from ?? "default"] ?? copyByType.default;

  return (
    <section className="mx-auto max-w-xl px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        {copy.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">{copy.heading}</h1>
      <p className="mt-4 text-foreground-muted">
        {copy.body}
        {from === "donate" && amount && (
          <span className="block mt-1 font-semibold text-ink">
            ${amount} received.
          </span>
        )}
      </p>

      {from === "booking" && (
        <div className="mt-8 rounded-2xl border border-clay/30 bg-clay/8 p-6 text-left">
          <p className="font-serif text-lg italic text-clay-dark">
            Before your session
          </p>
          <p className="mt-2 text-sm text-foreground-muted">
            Jenn asks every parent to do one small thing before the call. It
            shifts the whole energy of the conversation:
          </p>
          <blockquote className="mt-3 rounded-xl bg-surface px-4 py-3 text-sm italic text-ink">
            &quot;Please write down 1 thing your ex does well as a
            parent. We&apos;ll start there.&quot;
          </blockquote>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/resources"
          className="w-full rounded-full border border-border bg-surface px-6 py-2.5 text-center font-semibold text-ink transition-colors hover:border-clay hover:text-clay-dark sm:w-auto"
        >
          Read while you wait
        </Link>
        <Link
          href="/"
          className="w-full rounded-full bg-clay px-6 py-2.5 text-center font-semibold text-white transition-colors hover:bg-clay-dark sm:w-auto"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
