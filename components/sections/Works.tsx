"use client";

import { motion } from "framer-motion";
import { ProjectGallery } from "@/components/ProjectGallery";
import { PROJECTS } from "@/lib/projects";

export function Works() {
  const counts = PROJECTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section
      id="works"
      className="relative w-full px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--fg-dim)]">
              <span className="inline-block h-px w-6 bg-[var(--panel-border)]" aria-hidden />
              <span>Selected Works</span>
            </div>
            <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-tight text-[var(--fg)] md:text-5xl">
              Things I&apos;ve shipped
            </h2>
            <p className="mt-4 max-w-[55ch] text-[14px] leading-relaxed text-[var(--fg-muted)] md:text-[15px]">
              Tap a tile for the full story — stack, scope, and the metrics that
              moved. A mix of agentic builds, content engines, and back-office
              automations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(counts).map(([cat, n]) => (
              <span
                key={cat}
                className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--fg-muted)]"
              >
                {cat} · {n}
              </span>
            ))}
          </div>
        </motion.div>

        <ProjectGallery />
      </div>
    </section>
  );
}
