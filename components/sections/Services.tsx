"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Bot,
  Plug,
  Sparkles,
  GitBranch,
  Server,
} from "lucide-react";
import { SectionShell } from "./SectionShell";

const SERVICES = [
  {
    n: "01",
    icon: Workflow,
    title: "Workflow Automation",
    body:
      "Multi-step automations across Zapier, Make, and n8n — lead capture, lifecycle, billing, support, and back-office plumbing wired into a single flow.",
    tags: ["Zapier", "Make", "n8n"],
  },
  {
    n: "02",
    icon: Bot,
    title: "Agentic Development",
    body:
      "Vibe-coded full-stack apps with Claude Code — concept to deploy through natural-language orchestration, agentic debugging, and rapid iteration.",
    tags: ["Claude Code", "Next.js", "MVPs"],
  },
  {
    n: "03",
    icon: Plug,
    title: "API Integration & Scripting",
    body:
      "Custom API connections, webhook routers, and Google Apps Script glue between CRMs, sheets, billing, and the long tail of business tools.",
    tags: ["REST", "Webhooks", "Apps Script"],
  },
  {
    n: "04",
    icon: Sparkles,
    title: "AI Agents & LLM Workflows",
    body:
      "Production agents with grounded memory, tool use, and prompt pipelines — built to handle real intents, not demos. Designed for accuracy and recovery paths.",
    tags: ["Agents", "RAG", "Prompt Eng."],
  },
  {
    n: "05",
    icon: GitBranch,
    title: "GoHighLevel Buildouts",
    body:
      "GHL pipelines, lead nurturing, appointment workflows, and lifecycle automation — built end-to-end inside HighLevel and integrated with the wider stack.",
    tags: ["GHL", "CRM", "SMS/Email"],
  },
  {
    n: "06",
    icon: Server,
    title: "Process Audit & Mapping",
    body:
      "I'll trace your manual operations, map the friction, and design the automation architecture before any tool is chosen. Plumbing first, vendors second.",
    tags: ["Audit", "Architecture", "Docs"],
  },
];

export function Services() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title={
        <>
          What I <em className="not-italic text-[var(--fg-muted)]">actually</em> ship
        </>
      }
      lede="Six focused offerings — each one built around the same operating principle: replace repetitive human steps with reliable, observable automation."
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--panel-border)] sm:grid-cols-2">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 22,
                delay: i * 0.04,
              }}
              className="group relative flex flex-col gap-3 bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--panel)] md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--fg-dim)]">
                  {s.n}
                </span>
                <Icon
                  className="h-[18px] w-[18px] text-[var(--fg-muted)] transition-colors group-hover:text-[color:var(--accent)]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-2 text-[18px] font-medium leading-tight tracking-tight text-[var(--fg)] md:text-[20px]">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                {s.body}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.1em] text-[var(--fg-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
