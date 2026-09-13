export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia",
] as const;

export type ResourceCategory = {
  id: string;
  label: string;
  blurb: string;
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "legal-aid",
    label: "Legal aid & custody help",
    blurb: "Free or low-cost legal help, organized by state.",
  },
  {
    id: "coparenting-classes",
    label: "Co-parenting classes",
    blurb: "Court-recognized parenting classes, which vary by county.",
  },
  {
    id: "counseling",
    label: "Counseling & therapy",
    blurb: "Licensed therapists who take new clients near you.",
  },
  {
    id: "financial",
    label: "Financial assistance",
    blurb: "Local aid for housing, childcare, food, and utilities.",
  },
  {
    id: "domestic-violence",
    label: "Domestic violence support",
    blurb: "Confidential support, available now, wherever you are.",
  },
];

/**
 * Real, well-known national directories. Bridge with Jenn does not maintain
 * its own database of local organizations: for anything safety-critical
 * (legal aid, DV support) that's a liability if it goes stale or is wrong.
 * Instead we point to trusted directories that already do this well, plus
 * a scoped web search for the harder-to-index local stuff (classes).
 */
export function getLocalResourceLinks(stateName: string, categoryId: string) {
  const encodedState = encodeURIComponent(stateName);

  const always = [
    {
      name: "National Domestic Violence Hotline",
      detail: "Call or text 1-800-799-7233, available 24/7, every state.",
      url: "https://www.thehotline.org/",
    },
    {
      name: "988 Suicide & Crisis Lifeline",
      detail: "Call or text 988, available 24/7, every state.",
      url: "https://988lifeline.org/",
    },
  ];

  switch (categoryId) {
    case "legal-aid":
      return [
        {
          name: "LawHelp.org",
          detail: `Free/low-cost legal aid directory: select ${stateName} on their site.`,
          url: "https://www.lawhelp.org/",
        },
        {
          name: "211.org",
          detail: `Dial 211 or search online for help in ${stateName}, including legal aid.`,
          url: "https://www.211.org/",
        },
      ];
    case "counseling":
      return [
        {
          name: "Psychology Today Therapist Finder",
          detail: `Search licensed therapists near you in ${stateName}.`,
          url: "https://www.psychologytoday.com/us/therapists",
        },
        {
          name: "211.org",
          detail: "Free and sliding-scale counseling referrals by phone or web.",
          url: "https://www.211.org/",
        },
      ];
    case "financial":
      return [
        {
          name: "211.org",
          detail: `Housing, childcare, food, and utility assistance in ${stateName}.`,
          url: "https://www.211.org/",
        },
      ];
    case "domestic-violence":
      return always;
    case "coparenting-classes":
    default:
      return [
        {
          name: "211.org",
          detail: `Ask about court-approved co-parenting classes in ${stateName}.`,
          url: "https://www.211.org/",
        },
        {
          name: `Search the web for classes in ${stateName}`,
          detail: "Opens a search. Most classes are run at the county level.",
          url: `https://www.google.com/search?q=court+approved+co-parenting+class+${encodedState}`,
        },
      ];
  }
}
