// PROTOTYPE: illustrative picks, not real endorsements. Swap in Jenn's
// actual favorites (real songs, real shows, real books) before launch.

export type Pick = {
  title: string;
  by: string;
  note: string;
};

export const PLAYLIST: Pick[] = [
  {
    title: "Slow Exhale",
    by: "Marina Cole",
    note: "For the drive home after a hard handoff.",
  },
  {
    title: "Keep the Porch Light On",
    by: "The Willow Sons",
    note: "Warm and a little hopeful. Good for folding laundry.",
  },
  {
    title: "Steady Hands",
    by: "Rae Delancey",
    note: "Piano, mostly quiet. Jenn's go-to before a hard call.",
  },
  {
    title: "Better Weather",
    by: "Jonas & The Low Tide",
    note: "For the days it's actually starting to feel easier.",
  },
  {
    title: "Home Isn't a Person",
    by: "Theo Marsh",
    note: "Sits with the hard stuff without wallowing in it.",
  },
];

export const PODCAST_RECS: Pick[] = [
  {
    title: "Divorced, Not Defeated",
    by: "hosted by a family therapist duo",
    note: "Blunt, funny, and never precious about the hard parts.",
  },
  {
    title: "The Long Game",
    by: "a show about parenting through conflict",
    note: "Long-view thinking for people stuck in short-term fights.",
  },
  {
    title: "Two Houses, One Kid",
    by: "logistics-focused co-parenting show",
    note: "Less feelings, more spreadsheets. Sometimes that's what you need.",
  },
  {
    title: "Quietly Rebuilding",
    by: "solo-host show on identity after separation",
    note: "For the parts of this that aren't about the kids at all.",
  },
];

export const READING_LIST: Pick[] = [
  {
    title: "The Space Between Us",
    by: "Priya Nathan",
    note: "The book Jenn recommends most for decoding what fights are really about.",
  },
  {
    title: "Raising Kids Across Two Homes",
    by: "Daniel Foster",
    note: "Practical, not preachy. Good for the logistics-brain parent.",
  },
  {
    title: "Still Standing",
    by: "Marcus Ovid",
    note: "A memoir. For when you want to feel less alone in this.",
  },
  {
    title: "The Kid's Version",
    by: "Elena Vaughn",
    note: "What kids actually understand about the split, by age.",
  },
];
