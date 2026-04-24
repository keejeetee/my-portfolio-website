"use client";

import { memo, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export type AvatarState = "idle" | "thinking" | "speaking";

const FRAME_COUNT = 192;
const DEFAULT_FRAME = 181;
const X_FRAME_RANGE = 15;

function padFrame(n: number): string {
  return `/avatar-frames/frame_${String(n).padStart(4, "0")}.webp`;
}

function AvatarFrameImpl({ state = "idle", size = 220 }: { state?: AvatarState; size?: number }) {
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 80, damping: 20 });

  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);

  // Global mouse tracking
  useEffect(() => {
    if (reduced) return;
    const handle = (e: MouseEvent) => {
      rawX.set(Math.max(0, Math.min(1, e.clientX / window.innerWidth)));
      rawY.set(Math.max(0, Math.min(1, e.clientY / window.innerHeight)));
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [reduced, rawX, rawY]);

  // Drive frame index from smoothX — no React re-render
  useEffect(() => {
    if (reduced) return;
    return smoothX.on("change", (x) => {
      if (!imgRef.current) return;
      const offset = Math.round((x - 0.5) * 2 * X_FRAME_RANGE);
      const frame = Math.max(1, Math.min(FRAME_COUNT, DEFAULT_FRAME + offset));
      imgRef.current.src = padFrame(frame);
    });
  }, [reduced, smoothX]);

  // Preload frames in the trackable range
  useEffect(() => {
    const start = Math.max(1, DEFAULT_FRAME - X_FRAME_RANGE);
    const end = Math.min(FRAME_COUNT, DEFAULT_FRAME + X_FRAME_RANGE);
    for (let i = start; i <= end; i++) {
      const img = new window.Image();
      img.src = padFrame(i);
    }
  }, []);

  const haloOpacity = state === "speaking" ? 0.5 : state === "thinking" ? 0.22 : 0.13;
  const borderRadius = size < 100 ? "14px" : "24px";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, perspective: 900 }}
    >
      {/* Cyan halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cyan-400 blur-3xl"
        style={{ borderRadius }}
        animate={{
          opacity: haloOpacity,
          scale: state === "speaking" ? [1, 1.1, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 1.4, repeat: state === "speaking" ? Infinity : 0, ease: "easeInOut" },
        }}
      />

      {/* 3-D tilt driven by mouse springs */}
      <motion.div
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Breathing scale + thinking head-tilt */}
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  scale: [1, 1.022, 1],
                  rotate: state === "thinking" ? [0, 1.5, -1.5, 0] : 0,
                }
          }
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: {
              duration: 2.4,
              repeat: state === "thinking" ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
          style={{ width: size, height: size, overflow: "hidden", borderRadius }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={padFrame(DEFAULT_FRAME)}
            alt="Kent Genesis"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 12%",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export const AvatarFrame = memo(AvatarFrameImpl);
