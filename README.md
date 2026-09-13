# Bridge with Jenn

Site for a co-parenting mediation practice: book a session, share your
side beforehand, read how it works. Next.js 16 · React 19 · Tailwind 4 ·
TypeScript.

## Routes

| Route | What it is |
|---|---|
| `/` | Landing |
| `/share-your-side` (+ `/a`, `/b`) | Private intake — each parent's side, before the session |
| `/book` | Session booking (slot picker) |
| `/peace-room` | What a session actually looks like |
| `/podcast` | Show page + signup |
| `/resources` (+ 3 articles) | Written guidance |
| `/donate`, `/thank-you` | Support + post-submit |

## API

| Endpoint | State |
|---|---|
| `POST /api/intake` | Prototype — logs the payload; production note in-file (Airtable, keyed by shared case ID) |
| `GET/POST /api/reviews` | **Moderated** — see below; in-memory store |
| `PATCH /api/reviews` | Moderation approve/reject |
| `POST /api/guest-requests`, `/api/live-show-signup`, `/api/podcast-pitches`, `/api/sponsor-requests` | Prototype stubs, same pattern |

## Reviews moderation

Submissions land unapproved and render nowhere until a moderator acts.
The public `GET` serves approved reviews only and never returns the
queue; `POST` returns no review content.

Moderation is disabled unless `REVIEWS_MODERATION_TOKEN` is set (the
PATCH endpoint answers 503 rather than standing open):

```bash
# queue (returns ids)
curl -H "x-moderation-token: $REVIEWS_MODERATION_TOKEN" https://host/api/reviews
# approve / reject
curl -X PATCH https://host/api/reviews \
  -H "x-moderation-token: $REVIEWS_MODERATION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"<id>","action":"approve"}'   # or "reject" (drops it)
```

Token comparison is timing-safe. Before real traffic, move the in-memory
store to a database — the moderation flags and gates carry over.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build && npm start
```
