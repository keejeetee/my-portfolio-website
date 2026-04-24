"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SUGGESTIONS } from "@/lib/suggestions";

export function SuggestionChips({
  visible,
  onPick,
}: {
  visible: boolean;
  onPick: (text: string) => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-4 pb-0.5 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={s}
              onClick={() => onPick(s)}
              className="shrink-0 snap-start whitespace-nowrap rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3.5 py-1.5 text-[13px] text-[var(--fg-muted)] backdrop-blur-md transition hover:border-[color:var(--accent)]/40 hover:bg-[var(--panel-strong)] hover:text-[var(--fg)] active:scale-[0.98] md:px-4 md:py-2 md:text-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
