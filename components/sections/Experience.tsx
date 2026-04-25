"use client";

import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

type Role = {
  title: string;
  period: string;
  type: "current" | "freelance" | "education";
  bullets: string[];
};

const ROLES: Role[] = [
  {
    title: "AI Automation Specialist",
    period: "Dec 2025 — Present",
    type: "current",
    bullets: [
      "Designed and maintained 30+ automation workflows across Zapier, Make, and n8n.",
      "Built multi-step API integrations spanning CRM, billing, HR, and support systems.",
      "Implemented HighLevel automations for lead nurturing, appointment scheduling, and lifecycle tracking.",
      "Developed AI-powered internal tools using LLM-based prompt engineering.",
      "Created custom WordPress automations for membership sites and content workflows.",
    ],
  },
  {
    title: "Workflow Automation Specialist",
    period: "Freelance Engagements",
    type: "freelance",
    bullets: [
      "Reduced manual processes by ~80% through end-to-end workflow design for client teams.",
      "Integrated CRMs, marketing tools, and databases for seamless cross-platform data flow.",
      "Wrote Google Apps Script utilities to extend Workspace with custom functionality.",
      "Automated lead capture and follow-up cadences using GoHighLevel and Zapier.",
      "Provided consultation and training on automation best practices.",
    ],
  },
  {
    title: "API Integration Developer",
    period: "Freelance Engagements",
    type: "freelance",
    bullets: [
      "Built API connections between third-party applications to keep data flowing.",
      "Authored custom API workflows in JavaScript and Google Apps Script.",
      "Automated data entry and report generation, reclaiming hours of manual work.",
      "Optimized API call patterns for reliability, rate limits, and throughput.",
    ],
  },
  {
    title: "n8n AI Automation Specialist",
    period: "Freelance Engagements",
    type: "freelance",
    bullets: [
      "Designed scalable n8n workflows integrating LLMs, data processing, and third-party services.",
      "Connected CRM systems, cloud apps, databases, and comms platforms into reliable pipelines.",
      "Identified automation opportunities by mapping business processes end-to-end.",
      "Monitored, troubleshot, and tuned existing automations for performance and security.",
    ],
  },
  {
    title: "Bachelor of Science in Information Technology",
    period: "Cor Jesu College, Inc. — 2019",
    type: "education",
    bullets: [],
  },
];

export function Experience() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="A track record built in production"
      lede="Operating as both a contractor and an in-house specialist — the through-line is shipping automations that survive contact with real users and real edge cases."
    >
      <ol className="relative">
        <span
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--panel-border)] md:left-[9px]"
        />
        {ROLES.map((r, i) => (
          <motion.li
            key={r.title + r.period}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 22,
              delay: i * 0.05,
            }}
            className="relative pb-10 pl-8 last:pb-0 md:pl-10"
          >
            <span
              aria-hidden
              className={`absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full md:left-[2px] ${
                r.type === "current"
                  ? "bg-[var(--bg)] ring-2 ring-[color:var(--accent)]"
                  : "bg-[var(--panel-strong)] ring-1 ring-[var(--panel-border)]"
              }`}
            >
              {r.type === "current" && (
                <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[color:var(--accent)]" />
              )}
            </span>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-medium leading-tight tracking-tight text-[var(--fg)] md:text-[19px]">
                {r.title}
              </h3>
              <span className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                {r.period}
              </span>
            </div>

            {r.bullets.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                {r.bullets.map((b) => (
                  <li key={b} className="relative pl-4">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.65em] h-[3px] w-[3px] rounded-full bg-[var(--fg-dim)]"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
