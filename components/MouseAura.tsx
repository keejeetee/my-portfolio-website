"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

type Splash = { id: number; x: number; y: number };

const GOO_ID = "liquid-goo";

const blob = (slot: 1 | 2 | 3 | 4, alpha = "var(--aura-alpha)") =>
  `radial-gradient(circle at 50% 50%, rgba(var(--aura-${slot}), ${alpha}) 0%, rgba(var(--aura-${slot}), 0) 62%)`;

function MouseAuraImpl() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  // 4 springs tracking the same source — increasing lag for a mercury trail.
  const x1 = useSpring(x, { stiffness: 210, damping: 24, mass: 0.5 });
  const y1 = useSpring(y, { stiffness: 210, damping: 24, mass: 0.5 });
  const x2 = useSpring(x, { stiffness: 120, damping: 22, mass: 0.8 });
  const y2 = useSpring(y, { stiffness: 120, damping: 22, mass: 0.8 });
  const x3 = useSpring(x, { stiffness: 70, damping: 20, mass: 1.2 });
  const y3 = useSpring(y, { stiffness: 70, damping: 20, mass: 1.2 });
  const x4 = useSpring(x, { stiffness: 40, damping: 18, mass: 1.6 });
  const y4 = useSpring(y, { stiffness: 40, damping: 18, mass: 1.6 });

  const [active, setActive] = useState(false);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const activeRef = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!activeRef.current) {
        activeRef.current = true;
        setActive(true);
      }
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        activeRef.current = false;
        setActive(false);
      }, 1400);
    };

    const handleDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const id = ++nextId.current;
      setSplashes((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [x, y]);

  const removeSplash = (id: number) =>
    setSplashes((prev) => prev.filter((s) => s.id !== id));

  return (
    <>
      {/* Gooey merge filter — makes the blobs read as a single liquid mass */}
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={GOO_ID}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Liquid follower */}
      <motion.div
        aria-hidden
        className="aura-layer pointer-events-none fixed inset-0 z-[1]"
        style={{ filter: `url(#${GOO_ID})`, willChange: "opacity" }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Blob size={220} sx={x1} sy={y1} bg={blob(1, "var(--aura-alpha-strong)")} breathe={[1, 1.08, 0.96, 1]} dur={5.5} />
        <Blob size={195} sx={x2} sy={y2} bg={blob(2)} breathe={[1, 0.94, 1.1, 1]} dur={6.3} />
        <Blob size={170} sx={x3} sy={y3} bg={blob(3)} breathe={[1, 1.12, 0.9, 1]} dur={7.2} />
        <Blob size={145} sx={x4} sy={y4} bg={blob(4)} breathe={[1, 0.92, 1.08, 1]} dur={8.1} />
      </motion.div>

      {/* Click splashes — liquid ripples */}
      <AnimatePresence>
        {splashes.map((s) => (
          <Splash key={s.id} x={s.x} y={s.y} onDone={() => removeSplash(s.id)} />
        ))}
      </AnimatePresence>
    </>
  );
}

function BlobImpl({
  size,
  sx,
  sy,
  bg,
  breathe,
  dur,
}: {
  size: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  bg: string;
  breathe: number[];
  dur: number;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute top-0 left-0 rounded-full"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: bg,
        willChange: "transform",
      }}
      animate={{ scale: breathe }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const Blob = memo(BlobImpl);

function SplashImpl({
  x,
  y,
  onDone,
}: {
  x: number;
  y: number;
  onDone: () => void;
}) {
  return (
    <>
      {/* Outer bloom — soft liquid halo */}
      <motion.div
        aria-hidden
        className="aura-layer pointer-events-none fixed top-0 left-0 z-[2] rounded-full"
        style={{
          width: 120,
          height: 120,
          transform: `translate(${x - 60}px, ${y - 60}px)`,
          background:
            "radial-gradient(circle at 50% 50%, rgba(var(--aura-1), var(--aura-alpha-strong)) 0%, rgba(var(--aura-2), calc(var(--aura-alpha) * 0.7)) 45%, transparent 72%)",
          filter: "blur(14px)",
          willChange: "transform, opacity",
        }}
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 7, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={onDone}
      />

      {/* Expanding liquid ring (donut via radial gradient) */}
      <motion.div
        aria-hidden
        className="aura-layer pointer-events-none fixed top-0 left-0 z-[2] rounded-full"
        style={{
          width: 60,
          height: 60,
          transform: `translate(${x - 30}px, ${y - 30}px)`,
          background:
            "radial-gradient(circle at 50% 50%, transparent 42%, rgba(var(--aura-3), var(--aura-alpha-strong)) 52%, rgba(var(--aura-4), calc(var(--aura-alpha) * 0.6)) 60%, transparent 72%)",
          filter: "blur(2px)",
          willChange: "transform, opacity",
        }}
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 6.5, opacity: 0 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Droplet core */}
      <motion.div
        aria-hidden
        className="aura-layer pointer-events-none fixed top-0 left-0 z-[2] rounded-full"
        style={{
          width: 22,
          height: 22,
          transform: `translate(${x - 11}px, ${y - 11}px)`,
          background:
            "radial-gradient(circle at 50% 50%, rgba(var(--aura-1), 0.95) 0%, rgba(var(--aura-2), 0.7) 55%, transparent 78%)",
          filter: "blur(3px)",
          willChange: "transform, opacity",
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}

const Splash = memo(SplashImpl);

export const MouseAura = memo(MouseAuraImpl);
