"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Linkedin, Phone } from "lucide-react";

const CHANNELS = [
  {
    label: "Email",
    value: "bjtenebro@gmail.com",
    href: "mailto:bjtenebro@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/keejeetee",
    href: "https://linkedin.com/in/keejeetee",
    icon: Linkedin,
  },
  {
    label: "Phone",
    value: "+63 922 302 355",
    href: "tel:+63922302355",
    icon: Phone,
  },
  {
    label: "Based in",
    value: "Davao del Sur, Philippines",
    href: null,
    icon: MapPin,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 md:grid-cols-12 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="md:col-span-7"
        >
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--fg-dim)]">
            <span className="inline-block h-px w-6 bg-[var(--panel-border)]" aria-hidden />
            <span>Contact</span>
          </div>
          <h2 className="mt-3 text-4xl font-medium leading-[1.02] tracking-tight text-[var(--fg)] md:text-7xl">
            Have something
            <br />
            <span className="text-[var(--fg-muted)]">worth automating?</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[14px] leading-relaxed text-[var(--fg-muted)] md:text-[15px]">
            I take on a small number of projects each month. The fastest way in
            is a short email describing the manual process you&apos;d most love
            to delete.
          </p>

          <a
            href="mailto:bjtenebro@gmail.com?subject=Automation%20project"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/[0.08] px-5 py-3 text-[14px] font-medium text-[var(--fg)] transition-all hover:-translate-y-[1px] hover:border-[color:var(--accent)]/70 hover:bg-[color:var(--accent)]/[0.14] active:translate-y-0 active:scale-[0.98]"
          >
            <span>Start a conversation</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.08 }}
          className="md:col-span-5"
        >
          <ul className="flex flex-col divide-y divide-[var(--panel-border)] border-y border-[var(--panel-border)]">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      className="h-[16px] w-[16px] text-[var(--fg-muted)]"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)]">
                        {c.label}
                      </span>
                      <span className="text-[14px] text-[var(--fg)]">
                        {c.value}
                      </span>
                    </div>
                  </div>
                  {c.href && (
                    <ArrowUpRight
                      className="h-[15px] w-[15px] text-[var(--fg-dim)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
              );

              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group block transition-colors hover:bg-[var(--panel)]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-[12px] leading-relaxed text-[var(--fg-dim)]">
            Currently accepting freelance and contract engagements · Asia
            Pacific time zones preferred
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-[1200px] border-t border-[var(--panel-border)] pt-6">
        <div className="flex flex-col items-start justify-between gap-2 text-[10.5px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)] md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Kent Genesis Tenebro</span>
          <span>Built with Claude Code · Next.js · Framer Motion</span>
        </div>
      </div>
    </section>
  );
}
