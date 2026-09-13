import { notFound } from "next/navigation";
import IntakeForm from "@/components/IntakeForm";

export function generateStaticParams() {
  return [{ parent: "a" }, { parent: "b" }];
}

export default async function ParentIntakePage({
  params,
}: {
  params: Promise<{ parent: string }>;
}) {
  const { parent } = await params;

  if (parent !== "a" && parent !== "b") {
    notFound();
  }

  const label = parent === "a" ? "Parent A" : "Parent B";
  const badgeClass =
    parent === "a" ? "bg-clay/12 text-clay-dark" : "bg-sage/12 text-sage-dark";

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badgeClass}`}
      >
        {label}
      </span>
      <h1 className="mt-3 font-serif text-3xl text-ink">
        Tell Jenn what&apos;s going on
      </h1>
      <p className="mt-3 text-foreground-muted">
        Three questions, a few minutes. Answer honestly, this is just for
        Jenn, to help her walk into your call already understanding what
        matters to you.
      </p>
      <IntakeForm parent={parent} />
    </section>
  );
}
