"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionShell } from "./SectionShell";

// NOTE: Replace these with verified client quotes. Anonymized by role/industry
// until each client has signed off on attribution.
const QUOTES = [
  {
    body:
      "Kent rebuilt our lead-to-pipeline flow in under a week. We stopped hand-keying anything into the CRM, and the team finally trusts the dashboard numbers.",
    author: "Operations Lead",
    org: "DTC Wellness Brand · Australia",
  },
  {
    body:
      "He understood the messy parts of our process before he touched a tool. The n8n workflow he shipped has been running unattended for months.",
    author: "Founder",
    org: "B2B Coaching Practice · United States",
  },
  {
    body:
      "Asked for a small Zapier fix, ended up with a content engine that posts for us across three channels. The ROI conversation was over inside two weeks.",
    author: "Marketing Director",
    org: "SaaS Startup · Singapore",
  },
];

export function Testimonials() {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="What clients tell me after"
      lede="A few snippets from past engagements. Names withheld pending sign-off — happy to introduce you to any of them on a call."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.author + q.org}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 22,
              delay: i * 0.05,
            }}
            className={`relative flex flex-col justify-between gap-6 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 md:p-7 ${
              i === 0 ? "md:col-span-2" : ""
            }`}
          >
            <Quote
              className="absolute right-5 top-5 h-5 w-5 text-[var(--fg-dim)]"
              strokeWidth={1.5}
              aria-hidden
            />
            <blockquote
              className={`text-[var(--fg)] leading-relaxed ${
                i === 0 ? "text-[18px] md:text-[22px]" : "text-[15px] md:text-[16px]"
              }`}
            >
              <span className="text-[var(--fg-dim)]">&ldquo;</span>
              {q.body}
              <span className="text-[var(--fg-dim)]">&rdquo;</span>
            </blockquote>
            <figcaption className="flex items-center gap-3 text-[12px]">
              <span className="inline-block h-px w-6 bg-[var(--panel-border)]" aria-hidden />
              <span className="font-medium text-[var(--fg)]">{q.author}</span>
              <span className="text-[var(--fg-dim)]">·</span>
              <span className="text-[var(--fg-muted)]">{q.org}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionShell>
  );
}
