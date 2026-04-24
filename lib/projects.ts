export type ProjectCategory =
  | "Agentic Dev"
  | "n8n"
  | "Zapier"
  | "Make"
  | "GoHighLevel";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  stack: string;
  description: string;
  metrics: string[];
  media: { kind: "image" | "video"; src: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "fb-ai-agent",
    title: "AI Agent for Facebook",
    category: "n8n",
    stack: "n8n · Gemini · Webhooks",
    description:
      "Conversational AI agent wired to a Facebook Page inbox. A webhook routes inbound messages through a filter and branch, then into a Gemini-backed AI Agent with vector memory and document context so replies stay grounded in the brand's real content.",
    metrics: ["24/7 DM coverage", "~90% auto-reply", "<3s avg. response"],
    media: { kind: "image", src: "/projects/fb-ai-agent.png" },
  },
  {
    slug: "social-content-agent",
    title: "AI Social Media Content Creator",
    category: "n8n",
    stack: "n8n · LLM · Replicate · Graph API",
    description:
      "End-to-end content agent: a scheduled trigger generates a hook + quote, the AI Agent drafts copy, an image model renders the visual, Drive stores assets, and the Facebook Graph API publishes — no human in the loop.",
    metrics: ["Fully autonomous", "3–5 posts/day", "~25 hrs saved/week"],
    media: { kind: "image", src: "/projects/social-content-agent.png" },
  },
  {
    slug: "asmr-video-creator",
    title: "ASMR Video Creator",
    category: "n8n",
    stack: "n8n · LLM · Video API · YouTube API",
    description:
      "Agentic pipeline that turns a single prompt into a finished short-form ASMR video. The chain generates a script, synthesizes visuals, stitches audio, drops the final MP4 into Drive, then auto-uploads to YouTube with a generated title, description, and thumbnail.",
    metrics: ["0 → video in ~6 min", "100% automated", "Hands-off uploads"],
    media: { kind: "image", src: "/projects/asmr-video-creator.png" },
  },
  {
    slug: "ai-appointment-setter",
    title: "AI Appointment Setter",
    category: "n8n",
    stack: "n8n · LLM · Calendar API · CRM",
    description:
      "A multi-branch receptionist workflow that handles Set, Book, Update, and Cancel intents. The LLM parses the caller's request, the branch logic finds open slots, writes the booking, and confirms over SMS/email — with a recovery branch if the caller drops off.",
    metrics: ["4 intents handled", "~30 hrs saved/week", "No double-bookings"],
    media: { kind: "image", src: "/projects/ai-appointment-setter.png" },
  },
  {
    slug: "ai-jobs-scraper",
    title: "AI Jobs Scraper + Resume Optimizer",
    category: "n8n",
    stack: "n8n · LLM · Scraping · PDF",
    description:
      "Scrapes fresh job posts, scores them against a stored resume, and rewrites the resume per posting so every application lands keyword-aligned. Shortlisted roles drop into a dashboard with match-score + tailored PDF attached.",
    metrics: ["50+ jobs/day scored", "ATS keyword match ↑", "1-click apply"],
    media: { kind: "image", src: "/projects/ai-jobs-scraper.png" },
  },
  {
    slug: "ai-content-repurposing",
    title: "AI Content Repurposing Engine",
    category: "Zapier",
    stack: "Zapier · ChatGPT · YouTube · Buffer",
    description:
      "Drop a YouTube podcast URL and Zapier fans it out: transcript pulled, LLM re-cuts into threads, LinkedIn posts, blog intro, and short-form video captions — then schedules each piece to its channel.",
    metrics: ["1 video → 7 assets", "~20 hrs saved/week", "Cross-channel"],
    media: { kind: "image", src: "/projects/ai-content-repurposing.png" },
  },
  {
    slug: "asana-lead-engagement",
    title: "Asana CRM Lead Engagement",
    category: "Zapier",
    stack: "Zapier · Asana · Email · SMS",
    description:
      "Turns Asana into a lightweight CRM. New leads fire conditional paths by source and status — cold leads get a nurture drip, hot leads get an instant SMS + rep alert, and every touch writes back to the Asana task.",
    metrics: ["<60s first touch", "4 lifecycle stages", "100% logged"],
    media: { kind: "image", src: "/projects/asana-lead-engagement.png" },
  },
  {
    slug: "leads-enrichment",
    title: "Automated Leads Enrichment",
    category: "Zapier",
    stack: "Zapier · Clearbit-style API · CRM",
    description:
      "Each new lead is enriched with company size, role, socials, and tech stack, then scored against an ICP rubric. Qualified leads route to the closer; low-fit leads drop into a long-tail nurture — no manual research.",
    metrics: ["0 manual lookup", "ICP score on every row", "↑ qualified rate"],
    media: { kind: "image", src: "/projects/leads-enrichment.png" },
  },
  {
    slug: "xero-asana-sync",
    title: "Xero → Asana Transaction Sync",
    category: "Make",
    stack: "Make · Xero API · Asana · Google Sheets",
    description:
      "Watches completed Asana tasks, pulls the matching Xero account transactions, routes through an iterator + text aggregator to format a CSV, and posts it back to the Asana task as an attachment — with a Sheets audit log on the side.",
    metrics: ["Finance ↔ Ops synced", "Audit trail in Sheets", "Zero rekey"],
    media: { kind: "image", src: "/projects/xero-asana-sync.png" },
  },
  {
    slug: "gmail-auto-sort",
    title: "Auto-Sort Gmail Attachments",
    category: "Make",
    stack: "Make · Gmail · Gemini · Drive · Sheets",
    description:
      "Inbox watcher: every attachment gets analyzed by an AI vision step, renamed semantically, filed into the right Drive folder, logged to Sheets, and the sender gets an auto-reply confirming receipt. Inbox Zero, automated.",
    metrics: ["Semantic renaming", "100% filed", "~8 hrs saved/week"],
    media: { kind: "image", src: "/projects/gmail-auto-sort.png" },
  },
  {
    slug: "ghl-lead-capture",
    title: "Lead Capture + Instant Proposals",
    category: "GoHighLevel",
    stack: "GoHighLevel · SMS · Email · Pipelines",
    description:
      "New inbound lead → instant SMS + email, scheduled nurture cadence, and a proposal auto-generated from pipeline stage data. Reps only touch the lead once it's already warm and qualified.",
    metrics: ["<60s instant reply", "Proposal in 1 click", "↑ booked calls"],
    media: { kind: "image", src: "/projects/ghl-lead-capture.png" },
  },
  {
    slug: "freelancer-site-claude",
    title: "Freelancer Portfolio Site",
    category: "Agentic Dev",
    stack: "Claude Code · Next.js · Tailwind",
    description:
      "A full freelancer marketing site built end-to-end with Claude Code — hero, services, case studies, and booking flow. Shipped in a single vibe-coding session, zero boilerplate templates.",
    metrics: ["~70% faster build", "Shipped in 1 session", "Fully custom"],
    media: { kind: "video", src: "/projects/freelancer-site-claude.mp4" },
  },
  {
    slug: "3d-landing-claude",
    title: "3D Landing Page Experience",
    category: "Agentic Dev",
    stack: "Claude Code · Three.js · React",
    description:
      "Interactive 3D landing page generated through natural-language prompts — scroll-driven camera, WebGL hero, and responsive scene composition. Built to prove Claude Code can ship creative front-ends, not just CRUD.",
    metrics: ["WebGL hero", "Scroll-driven", "Prompt-built"],
    media: { kind: "video", src: "/projects/3d-landing-claude.mp4" },
  },
  {
    slug: "fitness-coach-app",
    title: "AI Fitness Coach App",
    category: "Agentic Dev",
    stack: "Claude Code · React · LLM",
    description:
      "A coaching app MVP: intake flow, plan generator, workout log, and an LLM chat coach that adapts weekly programming to the user's logged progress. SaaS-grade feel, solo-built.",
    metrics: ["SaaS MVP", "~70% faster build", "Adaptive plans"],
    media: { kind: "video", src: "/projects/fitness-coach-app.mp4" },
  },
];
