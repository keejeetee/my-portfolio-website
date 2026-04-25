"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Braces,
  Database,
  GitBranch,
  type LucideIcon,
  Plug,
  Sparkles,
  Webhook,
} from "lucide-react";
import { SectionShell } from "./SectionShell";

type Tool = {
  name: string;
  /** simple-icons slug (https://simpleicons.org). Rendered as a CSS mask so it
   *  inherits theme colors and stays visible in light + dark. */
  slug?: string;
  /** Fallback when the tool has no canonical brand mark. */
  Icon?: LucideIcon;
};

type ToolGroup = {
  label: string;
  items: Tool[];
};

const GROUPS: ToolGroup[] = [
  {
    label: "AI & Development",
    items: [
      { name: "Claude Code", slug: "anthropic" },
      { name: "Claude 3.5 Sonnet", slug: "anthropic" },
      { name: "Vibe Coding", Icon: Sparkles },
      { name: "Agent SDK", Icon: Bot },
      { name: "Cursor", slug: "cursor" },
    ],
  },
  {
    label: "Automation",
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "Zapier", slug: "zapier" },
      { name: "Make (Integromat)", slug: "make" },
      { name: "GoHighLevel", Icon: GitBranch },
      { name: "Power Automate", Icon: GitBranch },
    ],
  },
  {
    label: "Languages & Data",
    items: [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "SQL", Icon: Database },
      { name: "Google Apps Script", slug: "google" },
      { name: "REST APIs", Icon: Plug },
      { name: "Webhooks", Icon: Webhook },
      { name: "JSON", Icon: Braces },
    ],
  },
  {
    label: "Frameworks & UI",
    items: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Framer Motion", slug: "framer" },
    ],
  },
  {
    label: "Data & Storage",
    items: [
      { name: "Google Sheets", slug: "googlesheets" },
      { name: "Airtable", slug: "airtable" },
      { name: "Notion", slug: "notion" },
      { name: "Postgres", slug: "postgresql" },
    ],
  },
  {
    label: "Comms & Delivery",
    items: [
      { name: "WordPress", slug: "wordpress" },
      { name: "Slack", slug: "slack" },
      { name: "Twilio", slug: "twilio" },
      { name: "SendGrid", slug: "sendgrid" },
      { name: "Buffer", slug: "buffer" },
    ],
  },
];

function ToolLogo({ tool }: { tool: Tool }) {
  if (tool.slug) {
    const url = `https://cdn.simpleicons.org/${tool.slug}`;
    return (
      <span
        aria-hidden
        className="block h-[15px] w-[15px] shrink-0 bg-[var(--fg-muted)] transition-colors duration-200 group-hover:bg-[color:var(--accent)]"
        style={{
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }
  if (tool.Icon) {
    const Icon = tool.Icon;
    return (
      <Icon
        aria-hidden
        className="h-[15px] w-[15px] shrink-0 text-[var(--fg-muted)] transition-colors duration-200 group-hover:text-[color:var(--accent)]"
        strokeWidth={1.6}
      />
    );
  }
  return null;
}

export function Toolbox() {
  return (
    <SectionShell
      id="tools"
      eyebrow="Tools & Stack"
      title="The stack I reach for"
      lede="Tool-agnostic by default — but these are the ones I trust to ship reliable, observable systems on tight timelines."
    >
      <div className="flex flex-col divide-y divide-[var(--panel-border)] border-y border-[var(--panel-border)]">
        {GROUPS.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 22,
              delay: gi * 0.04,
            }}
            className="grid grid-cols-1 gap-3 py-5 md:grid-cols-12 md:gap-6 md:py-6"
          >
            <div className="md:col-span-3">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)]">
                {String(gi + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[14px] font-medium tracking-tight text-[var(--fg)] md:text-[15px]">
                {g.label}
              </div>
            </div>
            <div className="md:col-span-9">
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center gap-2 rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-2.5 py-1.5 text-[12.5px] text-[var(--fg)] transition-colors hover:border-[color:var(--accent)]/40 hover:bg-[var(--panel-strong)]"
                  >
                    <ToolLogo tool={item} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
