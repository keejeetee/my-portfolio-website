"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type FormEvent, type KeyboardEvent } from "react";

export function ChatInput({
  input,
  onChange,
  onSubmit,
  isLoading,
}: {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });
  const tx = useTransform(sx, (v) => v * 0.25);
  const ty = useTransform(sy, (v) => v * 0.25);

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-2xl items-end gap-2 rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-1.5 backdrop-blur-xl shadow-[0_0_60px_-20px_rgba(var(--accent-glow),0.25)] focus-within:border-[color:var(--accent)]/40 focus-within:shadow-[0_0_80px_-20px_rgba(var(--accent-glow),0.4)] transition"
    >
      <textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        rows={1}
        placeholder="Ask me anything…"
        className="flex-1 resize-none bg-transparent px-3 py-1.5 text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-dim)] focus:outline-none"
        style={{ maxHeight: 160 }}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 160) + "px";
        }}
      />
      <motion.button
        ref={btnRef}
        type="submit"
        disabled={isLoading || !input.trim()}
        style={{ x: tx, y: ty }}
        onMouseMove={(e) => {
          const rect = btnRef.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(e.clientX - (rect.left + rect.width / 2));
          my.set(e.clientY - (rect.top + rect.height / 2));
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] transition disabled:cursor-not-allowed disabled:bg-[var(--panel-strong)] disabled:text-[var(--fg-dim)] hover:brightness-110 active:scale-[0.95]"
        aria-label="Send message"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> : <ArrowUp className="h-4 w-4" strokeWidth={2.5} />}
      </motion.button>
    </form>
  );
}
