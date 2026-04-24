"use client";

import type { Message } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProjectGallery } from "./ProjectGallery";
import { TypingIndicator } from "./TypingIndicator";

const PROJECTS_MARKER = "{{PROJECTS}}";

function Bubble({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "user" | "assistant";
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-[var(--panel-strong)] px-4 py-2.5 text-[15px] text-[var(--fg)]"
            : "max-w-[85%] rounded-2xl rounded-bl-md border border-[color:var(--accent)]/15 bg-[var(--panel)] px-4 py-2.5 text-[15px] text-[var(--fg)] shadow-[0_0_40px_-10px_rgba(var(--accent-glow),0.3)]"
        }
      >
        {children}
      </div>
    </div>
  );
}

function AssistantContent({ content }: { content: string }) {
  if (!content.includes(PROJECTS_MARKER)) {
    return (
      <Bubble role="assistant">
        <div className="prose-chat">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </Bubble>
    );
  }

  const [before, after] = content.split(PROJECTS_MARKER);
  const trimmedBefore = before.trim();
  const trimmedAfter = (after ?? "").trim();

  return (
    <div className="flex flex-col gap-3">
      {trimmedBefore && (
        <Bubble role="assistant">
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {trimmedBefore}
            </ReactMarkdown>
          </div>
        </Bubble>
      )}
      <ProjectGallery />
      {trimmedAfter && (
        <Bubble role="assistant">
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {trimmedAfter}
            </ReactMarkdown>
          </div>
        </Bubble>
      )}
    </div>
  );
}

export function ChatMessages({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const lastAssistantStreaming =
    isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-6">
      <AnimatePresence initial={false}>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {m.role === "user" ? (
              <Bubble role="user">
                <span className="whitespace-pre-wrap">{m.content}</span>
              </Bubble>
            ) : (
              <AssistantContent content={m.content} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {lastAssistantStreaming && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[color:var(--accent)]/15 bg-[var(--panel)] px-4 py-2.5 shadow-[0_0_40px_-10px_rgba(var(--accent-glow),0.3)]">
            <TypingIndicator />
          </div>
        </motion.div>
      )}

      <div ref={endRef} />
    </div>
  );
}
