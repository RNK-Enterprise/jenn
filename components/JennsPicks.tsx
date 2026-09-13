import { PLAYLIST, PODCAST_RECS, READING_LIST, type Pick } from "@/lib/recommendations";

function PickColumn({
  eyebrow,
  title,
  items,
  theme,
}: {
  eyebrow: string;
  title: string;
  items: Pick[];
  theme: { dot: string; text: string };
}) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-wider ${theme.text}`}>
        {eyebrow}
      </p>
      <h3 className="mt-1 font-serif text-lg text-ink">{title}</h3>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${theme.dot}`} />
            <div>
              <p className="text-sm font-semibold text-ink">
                {item.title}{" "}
                <span className="font-normal text-foreground-muted">
                  , {item.by}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-foreground-muted">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JennsPicks() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        Off the clock
      </p>
      <h2 className="mt-2 font-serif text-2xl text-ink">Jenn&apos;s picks</h2>
      <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
        A running list of what Jenn is actually listening to and reading,
        updated whenever something&apos;s worth passing along.
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-3">
        <PickColumn
          eyebrow="Reading list"
          title="Books worth your nightstand"
          items={READING_LIST}
          theme={{ dot: "bg-clay", text: "text-clay-dark" }}
        />
        <PickColumn
          eyebrow="Podcasts"
          title="Other shows Jenn listens to"
          items={PODCAST_RECS}
          theme={{ dot: "bg-sage", text: "text-sage-dark" }}
        />
        <PickColumn
          eyebrow="Playlist"
          title="For the hard drives home"
          items={PLAYLIST}
          theme={{ dot: "bg-sky", text: "text-sky-dark" }}
        />
      </div>
    </div>
  );
}
