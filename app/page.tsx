"use client";

import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AvatarFrame, type AvatarState } from "@/components/AvatarFrame";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessages } from "@/components/ChatMessages";
import { SuggestionChips } from "@/components/SuggestionChips";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MouseAura } from "@/components/MouseAura";

export default function Home() {
  const { messages, input, handleSubmit, isLoading, append, setInput } =
    useChat({ api: "/api/chat" });

  const hasConversation = messages.length > 0;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  let avatarState: AvatarState = "idle";
  if (isLoading) {
    const last = messages[messages.length - 1];
    avatarState = last?.role === "user" ? "thinking" : "speaking";
  }

  const avatarSize = hasConversation
    ? isMobile
      ? 72
      : 96
    : isMobile
    ? 148
    : 220;

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="hero-glow pointer-events-none fixed inset-0 -z-10" />

      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Rainbow mouse aura + click splash */}
      <MouseAura />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-4 pt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)] md:px-8 md:pt-6 md:tracking-[0.2em]">
        <div className="flex min-w-0 items-center gap-2 md:gap-2.5">
          <Image
            src="/brand/logo.png"
            alt="KGT logo"
            width={241}
            height={173}
            priority
            className="h-6 w-auto shrink-0 rounded-[4px] md:h-7"
          />
          <span className="truncate">
            <span className="sm:hidden">Kent Genesis</span>
            <span className="hidden sm:inline">
              Kent Genesis · AI Native Portfolio
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden sm:inline">v0.1</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero area — centered when no convo, compacted above chat when active */}
      <motion.section
        layout
        className="flex flex-col items-center justify-center px-4"
        animate={{
          paddingTop: hasConversation ? 12 : isMobile ? 16 : 32,
          paddingBottom: hasConversation ? 8 : isMobile ? 16 : 32,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div layout>
          <AvatarFrame state={avatarState} size={avatarSize} />
        </motion.div>

        <AnimatePresence mode="wait">
          {!hasConversation && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-col items-center text-center md:mt-8"
            >
              <h1 className="text-[28px] font-medium leading-[1.1] tracking-tight text-[var(--fg)] md:text-6xl">
                Hey, I&apos;m Kent Genesis{" "}
                <span
                  className="inline-block"
                  style={{ filter: "drop-shadow(0 0 20px rgba(255,200,120,0.4))" }}
                >
                  👋
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-[13px] leading-snug text-[var(--fg-muted)] md:mt-4 md:text-base">
                AI Automation Specialist · Agentic AI-driven Developer
                <span className="mx-2 text-[var(--fg-dim)]">|</span>
                Davao del Sur, PH
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Conversation — pads bottom so fixed input never covers the last message.
          When idle, this also reserves the clear zone so the greeting is never
          obscured by the bottom chip/input stack on short phones. */}
      <section className="flex-1 overflow-y-auto pb-44 md:pb-40">
        {hasConversation && <ChatMessages messages={messages} isLoading={isLoading} />}
      </section>

      {/* Bottom floating zone: chips + input */}
      <div className="fixed inset-x-0 bottom-0 z-20 pb-3 pt-2 md:pb-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg)] via-[color:var(--bg)]/90 to-transparent md:h-32"
        />
        <div className="relative flex flex-col gap-2 px-4 md:gap-2.5">
          <SuggestionChips
            visible={!hasConversation && !isLoading}
            onPick={(text) => append({ role: "user", content: text })}
          />
          <ChatInput
            input={input}
            onChange={(v) => setInput(v)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <p className="text-center text-[9px] uppercase tracking-[0.16em] text-[var(--fg-dim)] md:text-[10px] md:tracking-[0.18em]">
            Streaming via Groq · built with Claude Code
          </p>
        </div>
      </div>
    </main>
  );
}
