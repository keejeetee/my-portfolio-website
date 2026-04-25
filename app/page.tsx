"use client";

import { useChat } from "ai/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AvatarFrame, type AvatarState } from "@/components/AvatarFrame";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessages } from "@/components/ChatMessages";
import { SuggestionChips } from "@/components/SuggestionChips";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MouseAura } from "@/components/MouseAura";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Works } from "@/components/sections/Works";
import { Toolbox } from "@/components/sections/Toolbox";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "works", label: "Works" },
  { id: "tools", label: "Tools" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

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

  // Scroll-driven fade for the fixed bottom chat zone — fades out as user
  // scrolls past hero so the sections below can breathe.
  const { scrollY } = useScroll();
  const idleChatOpacity = useTransform(scrollY, [0, 280, 520], [1, 1, 0]);
  const chatOpacity = hasConversation ? 1 : idleChatOpacity;

  const [chatInteractive, setChatInteractive] = useState(true);
  useMotionValueEvent(scrollY, "change", (y) => {
    setChatInteractive(hasConversation || y < 480);
  });

  // "Click me" avatar hint — always visible
  const showHint = true;

  return (
    <main className="relative flex min-h-[100dvh] flex-col">
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
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-transparent bg-[color:var(--bg)]/70 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)] backdrop-blur-md md:px-8 md:py-4 md:tracking-[0.2em]">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2 md:gap-2.5"
          aria-label="Back to top"
        >
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
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="transition-colors hover:text-[var(--fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1 text-[var(--fg-muted)] transition-colors hover:border-[color:var(--accent)]/40 hover:text-[var(--fg)] md:inline-block"
          >
            Hire
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* HERO — chat-first AI-native zone */}
      <section
        id="top"
        className="relative flex min-h-[calc(100dvh-56px)] flex-col"
      >
        <motion.div
          layout
          className="flex flex-col items-center justify-center px-4"
          animate={{
            paddingTop: hasConversation ? 12 : isMobile ? 16 : 32,
            paddingBottom: hasConversation ? 8 : isMobile ? 16 : 32,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div layout className="relative">
            <AvatarFrame state={avatarState} size={avatarSize} />

            <AnimatePresence>
              {showHint && (
                <motion.div
                  key="avatar-hint"
                  initial={{ opacity: 0, scale: 0.8, x: 8, y: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    delay: 1.0,
                  }}
                  className="pointer-events-none absolute -right-2 -top-3 translate-x-full md:-right-4 md:-top-2"
                  aria-hidden
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-[color:var(--accent)]/40 bg-[var(--panel)] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--fg)] shadow-[0_8px_30px_-12px_rgba(var(--accent-glow),0.55)] backdrop-blur-md"
                  >
                    <span
                      aria-hidden
                      className="absolute -bottom-[6px] left-2 h-3 w-3 rotate-45 border-b border-l border-[color:var(--accent)]/40 bg-[var(--panel)]"
                    />
                    <span
                      className="inline-block h-[6px] w-[6px] animate-pulse rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <span>click me</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
        </motion.div>

        {/* Conversation — scrolls naturally with the page so sections below stay reachable */}
        <div className="flex-1 px-0 pb-44 md:pb-40">
          {hasConversation && <ChatMessages messages={messages} isLoading={isLoading} />}
        </div>

        {/* Scroll affordance — only when no conversation */}
        {!hasConversation && (
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="pointer-events-auto absolute bottom-44 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)] md:flex md:bottom-40"
            aria-label="Scroll to services"
          >
            <span>Scroll</span>
            <motion.span
              className="block h-6 w-px bg-[var(--panel-border)]"
              animate={{ scaleY: [0.4, 1, 0.4], originY: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </motion.a>
        )}
      </section>

      {/* SECTIONS */}
      <Services />
      <Experience />
      <Works />
      <Toolbox />
      <Testimonials />
      <Contact />

      {/* Bottom floating zone: chips + input — fades when scrolled past hero */}
      <motion.div
        className={`fixed inset-x-0 bottom-0 z-20 pb-3 pt-2 md:pb-6 ${
          chatInteractive ? "" : "pointer-events-none"
        }`}
        style={{ opacity: chatOpacity }}
      >
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
      </motion.div>
    </main>
  );
}
