export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "not-actually-about-the-kids",
    title: "5 Things Co-Parents Fight About That Aren't Actually About the Kids",
    excerpt:
      "The 6:47pm text about pickup time is rarely about pickup time. Here's what's usually underneath it.",
    readTime: "5 min read",
    paragraphs: [
      "I've sat with a lot of parents who swore, absolutely swore, that the fight was about the soccer cleats. It's never about the soccer cleats.",
      "1. Being replaced. When a new partner shows up in the group chat logistics, it can reopen a wound that has nothing to do with scheduling. The fight about \"why does HE need to know the dentist appointment\" is usually a fight about grief.",
      "2. Feeling like a stranger in your own kid's life. If you're the parent with less time, every missed detail (a friend's name, an inside joke) can feel like proof you're becoming optional. That fear comes out sideways, as control over the details you can still control.",
      "3. Money as a stand-in for respect. Arguments about who pays for cleats or camp are rarely about $80. They're about whether the other parent sees your contributions, including the ones that don't show up on a receipt.",
      "4. Being management vs. being a parent. One parent often ends up as the default project manager of the kid's life. That parent isn't mad about a form being late. They're exhausted from being the only one who remembers forms exist.",
      "5. An old fight wearing a new outfit. If the argument feels oddly intense for the stakes, it's often a rerun. The pattern from the marriage (who over-functions, who withdraws) doesn't disappear just because you're co-parenting instead of married.",
      "None of this means the soccer cleats don't matter. It means that naming what's actually going on, out loud, in front of someone who isn't going to let either of you win the argument, changes the whole conversation. That's the work.",
    ],
  },
  {
    slug: "apologize-without-losing-dignity",
    title: "How to Apologize to Your Ex Without Losing Your Dignity",
    excerpt:
      "An apology isn't a surrender. Here's how to say the hard thing without handing over ammunition.",
    readTime: "4 min read",
    paragraphs: [
      "A lot of parents avoid apologizing to an ex because it feels like handing over a weapon. \"If I admit I was short with her at pickup, he'll bring it up in front of the mediator forever.\" That fear is real, and it's also solvable, with the right kind of apology.",
      "Skip the apology that's actually an argument. \"I'm sorry you felt that way\" isn't an apology, it's a subtweet. It tells the other parent their reaction was the problem, not your behavior. They'll hear it for what it is.",
      "Name the specific thing, not your whole character. You don't have to say \"I'm a bad co-parent.\" You can say \"I raised my voice at pickup on Tuesday, and that wasn't okay, regardless of what led up to it.\" Specific is safer than sweeping, for both of you.",
      "Don't attach a request. A real apology doesn't come with \"...so can we talk about the holiday schedule now.\" Let the apology be the whole sentence. If you need something, ask for it later, separately.",
      "Say it once, in writing or out loud, and then let it rest. Repeating an apology, or bringing it up again as proof of your good faith, turns it back into leverage. Say it, mean it, move on.",
      "Dignity doesn't come from never being wrong. It comes from being someone whose word means something, including when the word is \"I was wrong about that one.\" Your kid is watching how repair works. That's worth more than winning the text thread.",
    ],
  },
  {
    slug: "when-to-walk-away-from-a-text",
    title: "When to Walk Away from a Heated Text Exchange",
    excerpt:
      "Not every message needs a same-day reply. A field guide to knowing when to step back from the thread.",
    readTime: "4 min read",
    paragraphs: [
      "Texting is where co-parenting conflict goes to multiply. No tone of voice, no pause, no face to remind you there's a person on the other end who's also scared and tired. A few signs it's time to put the phone down.",
      "You've reread your own message three times before sending it. If you're editing for maximum impact instead of clarity, you're not communicating anymore. You're aiming.",
      "You're responding within sixty seconds to something that isn't urgent. Fast replies to non-urgent messages are almost always driven by adrenaline, not by what's actually good for your kid.",
      "The message could wait until pickup, but you don't want it to. That instinct, needing to have the last word tonight, is worth noticing. It's rarely about the kids. It's about not feeling okay until you feel like you've \"won.\"",
      "A simple rule that works: if a message makes your chest tight, you're allowed to write \"I want to think about this and respond thoughtfully. I'll follow up by [specific time].\" That's not avoidance. That's the opposite of avoidance: it's a promise to actually respond instead of just reacting.",
      "And if the same three fights keep happening over text, that's usually a sign the fight needs a person in the room, not another paragraph. That's what the Peace Room is for.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
