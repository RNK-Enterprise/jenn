import Link from "next/link";
import { articles } from "@/lib/articles";
import { downloads } from "@/lib/downloads";
import ResourceLocator from "@/components/ResourceLocator";
import ReviewsSection from "@/components/ReviewsSection";
import JennsPicks from "@/components/JennsPicks";

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        The Reality Check
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Resources</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Short, honest reads on co-parenting conflict, written in Jenn&apos;s
        voice, for the 11pm doomscroll instead of the 11pm argument.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-clay/50"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark">
              {article.readTime}
            </span>
            <h2 className="mt-2 font-serif text-xl leading-snug text-ink group-hover:text-clay-dark">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {/* DOWNLOADABLE MATERIALS */}
      <div className="mt-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
          Print it, use it tonight
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">
          Downloadable worksheets
        </h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          Free one-page guides, no email required.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {downloads.map((d, i) => {
            const theme = [
              { badge: "bg-clay/10 text-clay-dark", link: "text-clay-dark" },
              { badge: "bg-sage/10 text-sage-dark", link: "text-sage-dark" },
              { badge: "bg-sky/12 text-sky-dark", link: "text-sky-dark" },
            ][i % 3];
            return (
              <a
                key={d.file}
                href={`/downloads/${d.file}`}
                download
                className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-clay/50"
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold uppercase tracking-wide ${theme.badge}`}
                >
                  PDF
                </span>
                <span>
                  <span className="block font-semibold text-ink group-hover:text-clay-dark">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-sm text-foreground-muted">
                    {d.description}
                  </span>
                  <span
                    className={`mt-2 inline-block text-xs font-semibold ${theme.link}`}
                  >
                    Download ↓
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* JENN'S PICKS */}
      <div className="mt-16">
        <JennsPicks />
      </div>

      {/* LOCAL RESOURCE FINDER */}
      <div className="mt-16">
        <ResourceLocator />
      </div>

      {/* REVIEWS */}
      <div className="mt-10">
        <ReviewsSection />
      </div>
    </section>
  );
}
