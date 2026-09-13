import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/resources"
        className="text-sm font-semibold text-clay-dark hover:underline"
      >
        ← All articles
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-sage-dark">
        {article.readTime}
      </p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {article.title}
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-[17px] leading-relaxed text-foreground">
        {article.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface-muted p-6 text-center">
        <p className="font-serif text-lg italic text-ink">
          Stuck in a version of this fight right now?
        </p>
        <Link
          href="/share-your-side"
          className="mt-3 inline-block rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-white hover:bg-clay-dark"
        >
          Share Your Side with Jenn
        </Link>
      </div>
    </article>
  );
}
