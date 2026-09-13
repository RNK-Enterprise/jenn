export const PODCAST_NAME = "Common Ground";
export const PODCAST_TAGLINE =
  "A weekly conversation on co-parenting, conflict, and the 80% you already agree on.";
export const EPISODE_LENGTH_MIN = 60;

export type Episode = {
  number: number;
  title: string;
  description: string;
  guest?: string;
  durationMin: number;
};

// Release cadence: new episode every Friday.
export function getNextFridays(count: number, from: Date = new Date()): Date[] {
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay(); // 0 = Sun ... 5 = Fri
  const diff = (5 - day + 7) % 7;
  start.setDate(start.getDate() + diff);

  const fridays: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i * 7);
    fridays.push(d);
  }
  return fridays;
}

export function getPastFridays(count: number, from: Date = new Date()): Date[] {
  const [nextFriday] = getNextFridays(1, from);
  const fridays: Date[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date(nextFriday);
    d.setDate(nextFriday.getDate() - i * 7);
    fridays.push(d);
  }
  return fridays;
}

export function formatEpisodeDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// The live call-in show airs the first Friday of every month, in place of
// that week's regular drop.
export function isFirstFridayOfMonth(d: Date) {
  return d.getDate() <= 7;
}

export function getNextLiveShowDate(from: Date = new Date()): Date {
  let candidate = getNextFridays(1, from)[0];
  while (!isFirstFridayOfMonth(candidate)) {
    const next = new Date(candidate);
    next.setDate(candidate.getDate() + 7);
    candidate = next;
  }
  return candidate;
}

// PROTOTYPE: planned episode lineup, swap in real titles/guests/audio as
// they're recorded. "Upcoming" is the four next Friday drops; "Archive" is
// the batch Jenn records ahead of launch so the feed isn't empty week one.
// All episodes run about EPISODE_LENGTH_MIN (60) minutes.

export const UPCOMING_EPISODES: Episode[] = [
  {
    number: 11,
    title: "Money Fights in Disguise",
    description:
      "Why the $40 argument about camp fees is almost never about $40. A financial planner joins Jenn to talk about money as a stand-in for respect.",
    guest: "with a family financial planner",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 12,
    title: "Custody Schedules for Actual Humans",
    description:
      "Rigid parenting-time schedules look great on paper and fall apart in real life. How to build one that survives a flat tire and a sick kid.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 13,
    title: "Ask Jenn Anything",
    description:
      "A listener-submitted mailbag episode: real questions from the topic box below, answered live, no names attached.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 14,
    title: "The Co-Parent Who Won't Co-Parent",
    description:
      "What to do, and what not to waste your energy on, when only one of you is actually trying.",
    durationMin: EPISODE_LENGTH_MIN,
  },
];

export const ARCHIVE_EPISODES: Episode[] = [
  {
    number: 6,
    title: "The Apology You Owe Yourself",
    description:
      "Self-forgiveness after a divorce or breakup that didn't go the way you pictured it.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 5,
    title: "Kids Are Listening Louder Than You Think",
    description:
      "What children actually absorb from co-parent conflict, and the specific moments that stick.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 4,
    title: "When the New Partner Enters the Chat",
    description:
      "Blending families without reopening wounds that hadn't finished healing.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 3,
    title: "Holidays Without Homicide",
    description:
      "A practical framework for splitting holidays that doesn't require a lawyer or a breakdown.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 2,
    title: "The Text That Started World War Three",
    description:
      "Dissecting a real, anonymized text exchange line by line, and where exactly it went sideways.",
    durationMin: EPISODE_LENGTH_MIN,
  },
  {
    number: 1,
    title: "Why \"Fine\" Is Never Fine",
    description:
      "Decoding what your co-parent actually means when they say they're \"fine\" with the schedule.",
    durationMin: EPISODE_LENGTH_MIN,
  },
];
