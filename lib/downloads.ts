export type Download = {
  file: string;
  title: string;
  description: string;
};

export const downloads: Download[] = [
  {
    file: "pre-session-checklist.pdf",
    title: "The Pre-Session Checklist",
    description:
      "Five small things to do before you log on that change the whole energy of the call.",
  },
  {
    file: "de-escalation-phrases.pdf",
    title: "De-Escalation Phrases Cheat Sheet",
    description:
      "Four or five lines you can reach for automatically when a conversation starts to heat up.",
  },
  {
    file: "biff-text-template.pdf",
    title: "The BIFF Text Template",
    description:
      "A format for texts and emails to a hostile or hurt co-parent: Brief, Informative, Friendly, Firm.",
  },
  {
    file: "where-we-agree-worksheet.pdf",
    title: "Where We Agree Worksheet",
    description:
      "A fill-in worksheet to find the 80% you already agree on before you tackle the 20% you don't.",
  },
];
