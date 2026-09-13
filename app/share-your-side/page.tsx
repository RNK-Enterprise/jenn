import Link from "next/link";

export default function ShareYourSidePage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
          Step 1
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink">
          Share your side, privately
        </h1>
        <p className="mt-4 text-foreground-muted">
          Every family has two sides of the story, and no one likes filling
          out a form together. So don&apos;t. Each of you answers three quick
          questions on your own. Jenn reads both before you ever get on a
          call, and starts by finding where you already agree.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Link
          href="/share-your-side/a"
          className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface px-8 py-12 text-center transition-colors hover:border-clay/60"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/12 font-serif text-2xl italic text-clay-dark">
            A
          </span>
          <span className="text-lg font-semibold text-ink">Parent A</span>
          <span className="text-sm text-foreground-muted">
            I&apos;ll go first.
          </span>
        </Link>
        <Link
          href="/share-your-side/b"
          className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface px-8 py-12 text-center transition-colors hover:border-sage/60"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/12 font-serif text-2xl italic text-sage-dark">
            B
          </span>
          <span className="text-lg font-semibold text-ink">Parent B</span>
          <span className="text-sm text-foreground-muted">
            I&apos;ll share mine.
          </span>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-foreground-muted">
        It doesn&apos;t matter who goes first, and neither of you will see
        the other&apos;s answers. This isn&apos;t about winning the story,
        it&apos;s prep for a real conversation.
      </p>
    </section>
  );
}
