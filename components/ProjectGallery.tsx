"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 110, damping: 20 },
  },
};

function VideoTile({
  src,
  controls = false,
  className = "h-full w-full object-cover",
}: {
  src: string;
  controls?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={controls}
      preload="metadata"
      className={className}
    />
  );
}

function Card({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const wide = project.media.kind === "video";

  return (
    <motion.article
      variants={item}
      layoutId={`project-${project.slug}`}
      className={`group relative flex ${wide ? "lg:col-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex w-full flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] text-left transition-all duration-200 hover:-translate-y-[2px] hover:border-[color:var(--accent)]/40 hover:shadow-[0_20px_40px_-20px_rgba(var(--accent-glow),0.35)] active:translate-y-0 active:scale-[0.995] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/60"
        aria-label={`Open ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--panel-strong)]">
          {project.media.kind === "video" ? (
            <VideoTile src={project.media.src} />
          ) : (
            <Image
              src={project.media.src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute left-3 top-3">
            <span className="rounded-full border border-[var(--panel-border)] bg-[color:var(--bg)]/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--fg-muted)] backdrop-blur">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium leading-tight tracking-tight text-[var(--fg)]">
              {project.title}
            </h3>
            <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--fg-dim)]">
              {project.stack.split("·")[0]?.trim()}
            </span>
          </div>
          <p className="line-clamp-3 text-[13px] leading-relaxed text-[var(--fg-muted)]">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/[0.06] px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.08em]"
                style={{ color: "var(--accent)" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const isImage = project.media.kind === "image";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, zoomed]);

  const stack = project.stack.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[color:var(--bg)]/70 backdrop-blur-md"
      />

      <motion.div
        layoutId={`project-${project.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[color:var(--bg)]/80 text-[var(--fg)] backdrop-blur transition-colors hover:bg-[var(--panel-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/60"
          aria-label="Close"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="relative w-full bg-[var(--panel-strong)] md:w-[58%]">
          <div className="relative aspect-[16/10] md:h-full md:aspect-auto">
            {project.media.kind === "video" ? (
              <VideoTile
                src={project.media.src}
                controls
                className="absolute inset-0 h-full w-full object-contain md:object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="group absolute inset-0 block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/60"
                aria-label="View full image"
              >
                <Image
                  src={project.media.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-contain md:object-cover"
                  priority
                />
                <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] bg-[color:var(--bg)]/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--fg)] opacity-80 backdrop-blur transition-all group-hover:-translate-y-[1px] group-hover:opacity-100">
                  <Maximize2 className="h-3 w-3" strokeWidth={2} />
                  <span>View full</span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 md:w-[42%] md:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/[0.08] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
              {project.category}
            </span>
          </div>

          <h2 className="text-2xl font-medium leading-tight tracking-tight text-[var(--fg)] md:text-3xl">
            {project.title}
          </h2>

          <p className="text-[15px] leading-relaxed text-[var(--fg-muted)]">
            {project.description}
          </p>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)]">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[var(--panel-border)] bg-[var(--panel-strong)] px-2.5 py-1 text-[12px] text-[var(--fg)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-dim)]">
              Key metrics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[0.08] px-2.5 py-1 text-[12px] font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoomed && isImage && (
          <motion.div
            key="image-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — full image`}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
              }}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Close full image"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[1] flex h-full w-full items-center justify-center"
            >
              <div className="relative h-full w-full">
                <Image
                  src={project.media.src}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="select-none object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>

            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
              Esc · click to close
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectGalleryBase() {
  const [selected, setSelected] = useState<Project | null>(null);
  const onOpen = useCallback((p: Project) => setSelected(p), []);
  const onClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((p) => (
          <Card key={p.slug} project={p} onOpen={onOpen} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={onClose} />}
      </AnimatePresence>
    </>
  );
}

export const ProjectGallery = memo(ProjectGalleryBase);
