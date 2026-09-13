import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bridge with Jenn: Real empathy. Zero algorithms.",
  description:
    "Before you ask a bot how to raise your kids, ask a human who actually listens. Donation-based conflict navigation and life coaching for co-parents.",
};

const navLinks = [
  { href: "/share-your-side", label: "Share Your Side" },
  { href: "/book", label: "Book a Session" },
  { href: "/podcast", label: "Podcast" },
  { href: "/resources", label: "Resources" },
  { href: "/donate", label: "Donate" },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl italic text-clay-dark">
                Bridge
              </span>
              <span className="text-lg text-foreground-muted">with Jenn</span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-medium text-foreground-muted md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-glow transition-colors hover:text-clay-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/book"
              className="btn-glow rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark"
            >
              Talk to Jenn
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div className="max-w-sm">
                <span className="font-serif text-lg italic text-clay-dark">
                  Bridge with Jenn
                </span>
                <p className="mt-2 text-sm text-foreground-muted">
                  A calm place for co-parents to figure it out, together,
                  with a human in the room.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-foreground">
                    Get started
                  </span>
                  <Link
                    href="/share-your-side"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    Share Your Side
                  </Link>
                  <Link
                    href="/book"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    Book a Session
                  </Link>
                  <Link
                    href="/peace-room"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    The Peace Room
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-foreground">Learn</span>
                  <Link
                    href="/podcast"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    Podcast
                  </Link>
                  <Link
                    href="/resources"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    Resources
                  </Link>
                  <Link
                    href="/donate"
                    className="text-foreground-muted hover:text-clay-dark"
                  >
                    Donate
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-foreground">
                    Follow along
                  </span>
                  {/* TODO: swap "#" for Jenn's real profile URLs once she has them. */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label="Instagram (link coming soon)"
                      title="Instagram (coming soon)"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-clay hover:text-clay-dark"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook (link coming soon)"
                      title="Facebook (coming soon)"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-clay hover:text-clay-dark"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.6V3.1C16.3 3 15.4 3 14.3 3c-2.3 0-3.8 1.4-3.8 4v2.9H8v3.6h2.5V21h3z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="TikTok (link coming soon)"
                      title="TikTok (coming soon)"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-clay hover:text-clay-dark"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M16.6 3c.3 1.9 1.6 3.4 3.4 3.7v2.6c-1.2 0-2.4-.4-3.4-1.1v6.3c0 3-2.4 5.5-5.5 5.5S5.6 17.5 5.6 14.5s2.4-5.5 5.5-5.5c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.7V3h2.6z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-border pt-6">
              <p className="text-xs leading-relaxed text-foreground-muted">
                Jenn is a life coach and conflict navigator currently
                completing her coaching certification, not a licensed
                therapist or legal mediator. Bridge with Jenn does not
                provide therapy, legal advice, or custody recommendations.
                If you or your child are in danger, please contact 911 or
                the National Domestic Violence Hotline at 1-800-799-7233.
              </p>
              <p className="mt-3 text-xs text-foreground-muted">
                © {new Date().getFullYear()} Bridge with Jenn. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
