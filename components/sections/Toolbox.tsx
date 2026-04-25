"use client";

import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

type ToolGroup = {
  label: string;
  items: string[];
};

const GROUPS: ToolGroup[] = [
  {
    label: "AI & Development",
    items: [
      "Claude Code",
      "Claude 3.5 Sonnet",
      "Vibe Coding",
      "Agent SDK",
      "Cursor",
    ],
  },
  {
    label: "Automation",
    items: ["n8n", "Zapier", "Make (Integromat)", "GoHighLevel", "Power Automate"],
  },
  {
    label: "Languages & Data",
    items: [
      "JavaScript",
      "TypeScript",
      "SQL",
      "Google Apps Script",
      "REST APIs",
      "Webhooks",
      "JSON",
    ],
  },
  {
    label: "Frameworks & UI",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Data & Storage",
    items: ["Google Sheets", "Airtable", "Notion", "Postgres"],
  },
  {
    label: "Comms & Delivery",
    items: ["WordPress", "Slack", "Twilio", "SendGrid", "Buffer"],
  },
];

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
                    key={item}
                    className="rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-2.5 py-1 text-[12.5px] text-[var(--fg)] transition-colors hover:border-[color:var(--accent)]/40 hover:bg-[var(--panel-strong)]"
                  >
                    {item}
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
