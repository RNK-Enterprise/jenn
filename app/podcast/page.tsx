"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ARCHIVE_EPISODES,
  PODCAST_NAME,
  PODCAST_TAGLINE,
  UPCOMING_EPISODES,
  formatEpisodeDate,
  getNextFridays,
  getNextLiveShowDate,
  getPastFridays,
  type Episode,
} from "@/lib/podcast";
import PodcastPitchForm from "@/components/PodcastPitchForm";
import GuestRequestForm from "@/components/GuestRequestForm";
import LiveShowSignupForm from "@/components/LiveShowSignupForm";
import SponsorRequestForm from "@/components/SponsorRequestForm";

function WaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12v0" />
      <path d="M6 9v6" />
      <path d="M9 6v12" />
      <path d="M12 3v18" />
      <path d="M15 6v12" />
      <path d="M18 9v6" />
      <path d="M21 12v0" />
    </svg>
  );
}

export default function PodcastPage() {
  const upcomingDates = useMemo(
    () => getNextFridays(UPCOMING_EPISODES.length),
    []
  );
  const archiveDates = useMemo(
    () => getPastFridays(ARCHIVE_EPISODES.length),
    []
  );
  const nextLiveShowDate = useMemo(() => getNextLiveShowDate(), []);

  const [thisWeek, ...laterUpcoming] = UPCOMING_EPISODES;
  const thisWeekDate = upcomingDates[0];
  const laterDates = upcomingDates.slice(1);

  const isLiveDate = (d: Date) =>
    d.toDateString() === nextLiveShowDate.toDateString();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
        The Bridge with Jenn Podcast
      </p>
      <h1 className="mt-3 font-serif text-4xl italic text-sky-dark sm:text-5xl">
        {PODCAST_NAME}
      </h1>
      <p className="mt-3 max-w-xl text-foreground-muted">{PODCAST_TAGLINE}</p>
      <p className="mt-1 text-sm font-semibold text-sage-dark">
        New episodes every Friday.
      </p>

      {/* THIS WEEK SPOTLIGHT */}
      <div className="mt-10 overflow-hidden rounded-3xl bg-ink text-cream">
        <div className="p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky/25 text-sky">
              <WaveIcon className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-cream/70">
              This week · {formatEpisodeDate(thisWeekDate)}
            </span>
            {isLiveDate(thisWeekDate) && (
              <span className="flex items-center gap-1 rounded-full bg-clay/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" /> Live
                call-in
              </span>
            )}
          </div>
          <h2 className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">
            Ep. {thisWeek.number}: {thisWeek.title}
          </h2>
          <p className="mt-3 max-w-2xl text-cream/80">{thisWeek.description}</p>
          <p className="mt-4 text-sm text-cream/60">
            {thisWeek.guest ? `${thisWeek.guest} · ` : ""}
            ~{thisWeek.durationMin} min
          </p>
        </div>
      </div>

      {/* MONTHLY LIVE SHOW */}
      <div className="mt-10 overflow-hidden rounded-3xl bg-ink text-cream">
        <div className="grid gap-6 p-7 sm:grid-cols-[1.1fr_1fr] sm:p-9">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-clay" />
              <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                Once a month, we go live
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl italic sm:text-3xl">
              The Live Call-In Show
            </h2>
            <p className="mt-2 max-w-md text-cream/75">
              One Friday a month, the regular episode is replaced with a live
              show. Listeners call in with real questions and Jenn works
              through them on the air.
            </p>
            <p className="mt-3 text-sm font-semibold text-sky">
              Next live show: {formatEpisodeDate(nextLiveShowDate)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="mb-3 text-sm font-semibold text-cream/80">
              Get the call-in link
            </p>
            <LiveShowSignupForm />
          </div>
        </div>
      </div>

      {/* COMING UP */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl text-ink">Coming up</h2>
        <div className="mt-6 flex flex-col gap-4">
          {laterUpcoming.map((ep, i) => (
            <EpisodeRow
              key={ep.number}
              episode={ep}
              date={laterDates[i]}
              live={isLiveDate(laterDates[i])}
            />
          ))}
        </div>
      </div>

      {/* ARCHIVE */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl text-ink">The archive</h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Already recorded, ready to drop into the feed.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {ARCHIVE_EPISODES.map((ep, i) => (
            <EpisodeRow
              key={ep.number}
              episode={ep}
              date={archiveDates[i]}
              past
            />
          ))}
        </div>
      </div>

      {/* PITCH A TOPIC */}
      <div className="mt-16 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-sage-dark">
          Have a topic in mind?
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">
          Pitch an episode idea
        </h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          Fights about holidays, blended-family stuff, a text you didn&apos;t
          know how to answer: if it&apos;s a real co-parenting question, it
          might be a real episode. &quot;Ask Jenn Anything&quot; episodes are
          built entirely from this box.
        </p>
        <div className="mt-6">
          <PodcastPitchForm />
        </div>
      </div>

      {/* BE A GUEST */}
      <div className="mt-6 rounded-3xl border border-sky/25 bg-sky/6 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-dark">
          Have something to add?
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">
          Want to be a guest?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          Family lawyers, therapists, financial planners, or a co-parent with
          a story worth telling: if you&apos;d bring something real to the
          conversation, send a request and Jenn will follow up.
        </p>
        <div className="mt-6">
          <GuestRequestForm />
        </div>
      </div>

      {/* SPONSOR / SUPPORT */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-clay-dark">
            Back the show
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink">
            Sponsor an episode
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            A short mention at the top of one episode. Sponsorship covers
            production costs and helps keep sessions affordable for families
            who can&apos;t pay full price.
          </p>
          <div className="mt-6">
            <SponsorRequestForm />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-ink p-6 text-cream sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sage">
              Or skip the mention
            </p>
            <h2 className="mt-2 font-serif text-2xl italic">
              Support a family in need
            </h2>
            <p className="mt-2 text-sm text-cream/75">
              No episode credit, no logo, just a donation that funds a
              session for a family who can&apos;t pay. That&apos;s the whole
              model.
            </p>
          </div>
          <Link
            href="/donate"
            className="btn-glow btn-glow-sage mt-6 inline-block self-start rounded-full bg-sage px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-dark"
          >
            Go to Donate
          </Link>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-foreground-muted">
        Need to talk today instead of waiting for Friday?{" "}
        <Link href="/book" className="font-semibold text-clay-dark hover:underline">
          Book a session with Jenn
        </Link>
        .
      </p>
    </section>
  );
}

function EpisodeRow({
  episode,
  date,
  past,
  live,
}: {
  episode: Episode;
  date: Date;
  past?: boolean;
  live?: boolean;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky/12 text-sm font-serif italic text-sky-dark">
        {episode.number}
      </span>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-semibold text-ink">{episode.title}</h3>
          <span className="text-xs text-foreground-muted">
            {past ? "Recorded" : "Drops"} {formatEpisodeDate(date)} ·{" "}
            {episode.durationMin} min
          </span>
          {live && (
            <span className="flex items-center gap-1 rounded-full bg-clay/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" /> Live
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-foreground-muted">
          {episode.description}
        </p>
        {episode.guest && (
          <p className="mt-1 text-xs font-medium text-sage-dark">
            {episode.guest}
          </p>
        )}
      </div>
    </div>
  );
}
