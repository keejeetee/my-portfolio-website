# Kent Genesis — AI-Native Portfolio

A single-page portfolio where visitors talk to an animated AI avatar instead of scrolling through static sections. Inspired by [toukoum.fr](https://www.toukoum.fr/), personalized for Kent Genesis Tenebro (AI Automation Specialist, Davao del Sur, PH).

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind v4 · Vercel AI SDK · Groq (Llama 3.1 70B) · Framer Motion · lucide-react

## Setup

```bash
npm install
cp .env.example .env.local
# edit .env.local and paste your Groq key
npm run dev
```

Open http://localhost:3000.

### Get a Groq API key (free)
1. Sign up at https://console.groq.com
2. Create an API key
3. Paste it into `.env.local` as `GROQ_API_KEY=gsk_...`

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Add environment variable: `GROQ_API_KEY` with your key.
4. Deploy. Done — streaming works on the edge runtime out of the box.

## Customize

| I want to... | Edit this file |
|---|---|
| Change the bio / resume content | `lib/prompt.ts` |
| Change the suggestion chips on load | `lib/suggestions.ts` |
| Tweak the avatar face, hair, animations | `components/Avatar.tsx` |
| Change color accents, fonts, background | `app/globals.css` + `app/layout.tsx` |
| Swap LLM (OpenAI, Anthropic, etc.) | `app/api/chat/route.ts` |
| Update the Calendly link | search for `{{CALENDLY_URL}}` in `lib/prompt.ts` |

## Project structure

```
app/
  layout.tsx          root layout, Geist font, dark bg
  page.tsx            main single-page chat experience
  globals.css         Tailwind + CSS variables + markdown styling
  api/chat/route.ts   streaming POST handler (Groq via Vercel AI SDK)
components/
  Avatar.tsx          animated SVG face (breathing, blink, speaking states)
  ChatInput.tsx       floating input pill with magnetic send button
  ChatMessages.tsx    streaming message list with markdown rendering
  SuggestionChips.tsx four chips, hidden after first user message
  TypingIndicator.tsx three-dot pulse while the avatar thinks
lib/
  prompt.ts           SYSTEM_PROMPT with full resume content
  suggestions.ts      chip text
public/brand/
  logo.png            favicon + OG image
```

## Before going live

- [ ] Replace `{{CALENDLY_URL}}` in `lib/prompt.ts` with your real Calendly/Cal.com link
- [ ] Add a production `GROQ_API_KEY` in Vercel project settings
- [ ] (Optional) Customize the avatar's SVG face to match your real likeness
- [ ] (Optional) Swap in a nicer OG image in `public/brand/`

## Credits

Design inspiration: [toukoum.fr](https://www.toukoum.fr/) by Raphael Giraud. Built with Claude Code.
