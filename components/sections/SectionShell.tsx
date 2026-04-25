"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, lede, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative w-full px-4 py-20 md:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="grid gap-6 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--fg-dim)]">
              <span className="inline-block h-px w-6 bg-[var(--panel-border)]" aria-hidden />
              <span>{eyebrow}</span>
            </div>
            <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-tight text-[var(--fg)] md:text-5xl">
              {title}
            </h2>
            {lede && (
              <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-[var(--fg-muted)] md:text-[15px]">
                {lede}
              </p>
            )}
          </div>
          <div className="md:col-span-8">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
