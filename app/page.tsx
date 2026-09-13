import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { PODCAST_NAME, UPCOMING_EPISODES } from "@/lib/podcast";

export default function Home() {
  const [thisWeekEpisode] = UPCOMING_EPISODES;

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-4 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
            Real empathy. Zero algorithms.
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Before you ask a bot how to raise your kids,{" "}
            <span className="italic text-clay-dark">
              ask a human who actually listens.
            </span>
          </h1>
          <p className="mt-5 text-lg text-foreground-muted">
            Bridge with Jenn is a calm, confidential space for co-parents in
            conflict, a life coach who reads the room a chatbot never
            will, and helps you find the 80% you already agree on.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/share-your-side"
              className="w-full rounded-full bg-clay px-7 py-3 text-center font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark sm:w-auto"
            >
              Share Your Side
            </Link>
            <Link
              href="/book"
              className="w-full rounded-full border border-border bg-surface px-7 py-3 text-center font-semibold text-ink transition-colors hover:border-clay hover:text-clay-dark sm:w-auto"
            >
              Book a Session
            </Link>
          </div>
        </div>

        {/* Robot vs Human split panel */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border shadow-sm sm:grid-cols-2">
          <div className="relative flex h-56 flex-col justify-between overflow-hidden bg-slate-800 p-6 sm:h-72">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex gap-2 opacity-60">
              <span className="h-8 w-8 rounded-lg border border-slate-500/70" />
              <span className="h-8 w-16 rounded-lg border border-dashed border-slate-500/70" />
            </div>
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                Chatbot
              </p>
              <p className="mt-1 max-w-[16rem] text-sm text-slate-300">
                Summarizes the argument. Can&apos;t hear your voice crack.
              </p>
            </div>
          </div>
          <div className="flex h-56 items-center gap-4 bg-gradient-to-br from-clay/15 via-cream to-sage/15 p-5 sm:h-72 sm:gap-5 sm:p-6">
            <div className="relative aspect-[3/4] h-full flex-shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <Image
                src="/jenn.jpg"
                alt="Jenn, life coach and conflict navigator"
                fill
                priority
                className="object-cover object-top"
                sizes="180px"
              />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-sage-dark">
                Jenn
              </p>
              <p className="mt-1 max-w-[14rem] text-sm text-ink">
                Reads the room. Notices the tears before they fall. Helps you
                de-escalate in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDING SCALE PROMISE */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-clay/30 bg-clay/8 px-6 py-6 text-center sm:px-10 sm:py-8">
          <p className="font-serif text-xl italic text-clay-dark sm:text-2xl">
            Priced by your reality.
          </p>
          <p className="mt-2 text-foreground-muted">
            Sessions are donation-based: suggested $20 to $60, but $0 is
            welcome if you&apos;re struggling. No one is turned away for what
            they can&apos;t pay.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-center font-serif text-3xl text-ink">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Share your side, privately",
              body: "Each parent fills out a short, confidential form, separately. No shared doc, no waiting for the other person.",
              badge: "bg-clay/12 text-clay-dark",
            },
            {
              step: "2",
              title: "Jenn finds the common ground",
              body: "Before the call, Jenn reads both sides and spots where you already agree: usually about 80% of it.",
              badge: "bg-sage/12 text-sage-dark",
            },
            {
              step: "3",
              title: "Meet in the Peace Room",
              body: "A guided video session built for de-escalation, with a Safe Word button either parent can use at any time.",
              badge: "bg-sky/15 text-sky-dark",
            },
          ].map((item) => (
            <div key={item.step} className="text-center sm:text-left">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl italic ${item.badge}`}
              >
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-foreground-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SAFE WORD CALLOUT */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid items-center gap-8 rounded-3xl bg-sage/10 p-8 sm:grid-cols-[1fr_auto] sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
              The Peace Room
            </p>
            <h2 className="mt-2 font-serif text-2xl text-ink">
              One button, and the conversation pauses. Immediately.
            </h2>
            <p className="mt-2 max-w-xl text-foreground-muted">
              If either parent feels unheard or overwhelmed, they click{" "}
              <span className="font-semibold text-sage-dark">Safe Word</span>{" "}
              and Jenn pauses the session right there, no explanations
              required in the moment.
            </p>
          </div>
          <Link
            href="/peace-room"
            className="whitespace-nowrap rounded-full bg-sage px-6 py-3 text-center font-semibold text-white shadow-sm transition-colors hover:bg-sage-dark"
          >
            See the Peace Room
          </Link>
        </div>
      </section>

      {/* PODCAST TEASER */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="overflow-hidden rounded-3xl bg-ink text-cream">
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky/80">
                New every Friday
              </p>
              <h2 className="mt-2 font-serif text-2xl italic text-sky sm:text-3xl">
                {PODCAST_NAME}
              </h2>
              <p className="mt-2 max-w-xl text-cream/75">
                This week: &quot;{thisWeekEpisode.title}.&quot;{" "}
                {thisWeekEpisode.description}
              </p>
            </div>
            <Link
              href="/podcast"
              className="whitespace-nowrap self-start rounded-full bg-clay px-6 py-3 text-center font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark sm:self-auto"
            >
              Listen &amp; see the archive
            </Link>
          </div>
        </div>
      </section>

      {/* RESOURCES PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-ink">The Reality Check</h2>
          <Link
            href="/resources"
            className="hidden text-sm font-semibold text-clay-dark hover:underline sm:block"
          >
            All articles →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className={`group flex flex-col rounded-2xl border border-t-4 border-border bg-surface p-6 transition-colors hover:border-clay/50 ${
                ["border-t-clay", "border-t-sage", "border-t-sky"][i % 3]
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark">
                {article.readTime}
              </span>
              <h3 className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-clay-dark">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/resources"
          className="mt-6 block text-sm font-semibold text-clay-dark hover:underline sm:hidden"
        >
          All articles →
        </Link>
      </section>

      {/* DONATION TEASER */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-10">
          <h2 className="font-serif text-2xl italic sm:text-3xl">
            100% of your donation keeps this bridge open.
          </h2>
          <p className="max-w-xl text-cream/80">
            No corporate overhead, no ads, no algorithm deciding who gets
            heard. Just a human, available to families who need one.
          </p>
          <Link
            href="/donate"
            className="rounded-full bg-clay px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark"
          >
            Support a Family&apos;s Session
          </Link>
        </div>
      </section>
    </>
  );
}
