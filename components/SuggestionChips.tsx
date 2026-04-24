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
          className="flex flex-wrap items-center justify-center gap-2 px-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--fg-muted)] backdrop-blur-md transition hover:border-[color:var(--accent)]/40 hover:bg-[var(--panel-strong)] hover:text-[var(--fg)] active:scale-[0.98]"
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
