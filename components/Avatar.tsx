"use client";

import { memo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type AvatarState = "idle" | "thinking" | "speaking";

function AvatarImpl({ state = "idle", size = 220 }: { state?: AvatarState; size?: number }) {
  const reduced = useReducedMotion();
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
      t = setTimeout(loop, 2500 + Math.random() * 3000);
    };
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, [reduced]);

  const haloOpacity = state === "speaking" ? 0.55 : state === "thinking" ? 0.25 : 0.15;

  // Same segment structure across states so Framer can interpolate the d-path
  const mouthPath =
    state === "speaking"
      ? "M 94 146 Q 110 160 126 146"
      : state === "thinking"
      ? "M 98 148 Q 110 150 122 148"
      : "M 96 148 Q 110 154 124 146";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Cyan halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl"
        animate={{ opacity: haloOpacity, scale: state === "speaking" ? [1, 1.08, 1] : 1 }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 1.4, repeat: state === "speaking" ? Infinity : 0, ease: "easeInOut" },
        }}
      />

      {/* Breathing + head tilt wrapper */}
      <motion.div
        className="relative"
        animate={
          reduced
            ? {}
            : { scale: [1, 1.025, 1], rotate: state === "thinking" ? [0, 2, -2, 0] : 0 }
        }
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: 2.4,
            repeat: state === "thinking" ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 220 220"
          width={size}
          height={size}
          className="drop-shadow-[0_10px_30px_rgba(34,211,238,0.25)]"
        >
          <defs>
            <radialGradient id="face" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stopColor="#EBC59B" />
              <stop offset="55%" stopColor="#D4A374" />
              <stop offset="100%" stopColor="#8A5F3A" />
            </radialGradient>
            <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E2014" />
              <stop offset="100%" stopColor="#15100A" />
            </linearGradient>
            <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F2A44" />
              <stop offset="100%" stopColor="#0E1628" />
            </linearGradient>
            <linearGradient id="tie" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#243456" />
              <stop offset="100%" stopColor="#151F38" />
            </linearGradient>
            <radialGradient id="bg-soft" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.12)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
          </defs>

          {/* Soft backdrop disc */}
          <circle cx="110" cy="110" r="108" fill="url(#bg-soft)" />

          {/* ───────── SUIT ───────── */}
          <path
            d="M 38 220 L 56 182 Q 80 172 96 174 L 110 196 L 124 174 Q 140 172 164 182 L 182 220 Z"
            fill="url(#suit)"
          />
          {/* Lapel shadow */}
          <path
            d="M 96 174 L 110 196 L 96 220 L 82 220 Z"
            fill="rgba(0,0,0,0.25)"
          />
          <path
            d="M 124 174 L 110 196 L 124 220 L 138 220 Z"
            fill="rgba(0,0,0,0.25)"
          />
          {/* White shirt collar */}
          <path
            d="M 96 174 L 110 200 L 124 174 L 120 172 L 110 192 L 100 172 Z"
            fill="#F2F1EC"
          />
          {/* Tie knot */}
          <path
            d="M 104 194 L 116 194 L 118 202 L 110 206 L 102 202 Z"
            fill="#17203A"
          />
          {/* Tie body */}
          <path
            d="M 105 206 L 115 206 L 117 220 L 103 220 Z"
            fill="url(#tie)"
          />

          {/* ───────── NECK ───────── */}
          <path
            d="M 98 156 L 122 156 L 124 178 L 96 178 Z"
            fill="url(#face)"
          />
          {/* Under-chin shadow */}
          <ellipse cx="110" cy="158" rx="20" ry="5" fill="#6F4B2E" opacity="0.35" />

          {/* ───────── HAIR BACK (silhouette extending above & around head) ───────── */}
          <path
            d="M 48 108
               Q 36 56 92 38
               Q 140 30 172 56
               Q 186 92 174 132
               Q 168 110 162 100
               L 162 130
               Q 156 104 110 100
               Q 64 104 58 130
               L 58 104
               Q 52 114 48 108 Z"
            fill="url(#hair)"
          />

          {/* ───────── FACE ───────── */}
          <ellipse cx="110" cy="110" rx="48" ry="58" fill="url(#face)" />

          {/* Subtle face shading on jaw */}
          <ellipse cx="110" cy="152" rx="36" ry="12" fill="#6F4B2E" opacity="0.18" />
          <ellipse cx="72" cy="118" rx="8" ry="22" fill="#8A5F3A" opacity="0.15" />
          <ellipse cx="148" cy="118" rx="8" ry="22" fill="#8A5F3A" opacity="0.15" />

          {/* ───────── HAIR FRONT (textured quiff, swept up & slightly to viewer's left) ───────── */}
          <path
            d="M 60 96
               Q 54 40 100 28
               Q 138 24 158 48
               Q 170 74 164 96
               Q 158 78 146 78
               Q 140 64 122 66
               Q 112 74 104 80
               Q 94 74 82 72
               Q 72 72 66 84
               Q 62 78 60 96 Z"
            fill="url(#hair)"
          />
          {/* Strand highlights */}
          <path
            d="M 80 42 Q 96 30 118 32 Q 100 38 86 50 Z"
            fill="#3F2D1E"
            opacity="0.55"
          />
          <path
            d="M 136 36 Q 150 38 160 54 Q 148 46 134 44 Z"
            fill="#3F2D1E"
            opacity="0.55"
          />
          <path
            d="M 158 66 Q 164 78 162 94 Q 156 82 154 74 Z"
            fill="#3F2D1E"
            opacity="0.5"
          />
          {/* Sideburn hint */}
          <path d="M 58 110 L 62 128 L 64 110 Z" fill="url(#hair)" />
          <path d="M 162 110 L 158 128 L 156 110 Z" fill="url(#hair)" />

          {/* ───────── EARS ───────── */}
          <ellipse cx="58" cy="122" rx="5.5" ry="10" fill="url(#face)" />
          <ellipse cx="162" cy="122" rx="5.5" ry="10" fill="url(#face)" />
          <path d="M 57 120 Q 55 124 57 128" stroke="#7A5638" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 163 120 Q 165 124 163 128" stroke="#7A5638" strokeWidth="1" fill="none" opacity="0.5" />

          {/* ───────── EYEBROWS (thick, defined, slight arch) ───────── */}
          <path
            d="M 74 102 Q 86 94 102 100 Q 98 104 88 104 Q 80 104 74 102 Z"
            fill="#15100A"
          />
          <path
            d="M 118 100 Q 134 94 146 102 Q 140 104 132 104 Q 122 104 118 100 Z"
            fill="#15100A"
          />

          {/* ───────── EYES ───────── */}
          <g>
            <ellipse
              cx="86"
              cy="116"
              rx="5.5"
              ry={blink ? 0.5 : 6}
              fill="#2B1B0E"
              style={{ transition: "ry 90ms ease-out" }}
            />
            <ellipse
              cx="134"
              cy="116"
              rx="5.5"
              ry={blink ? 0.5 : 6}
              fill="#2B1B0E"
              style={{ transition: "ry 90ms ease-out" }}
            />
            {!blink && (
              <>
                <circle cx="88" cy="114" r="1.6" fill="#fff" opacity="0.95" />
                <circle cx="136" cy="114" r="1.6" fill="#fff" opacity="0.95" />
                <circle cx="84" cy="118" r="0.7" fill="#fff" opacity="0.5" />
                <circle cx="132" cy="118" r="0.7" fill="#fff" opacity="0.5" />
              </>
            )}
          </g>

          {/* ───────── NOSE ───────── */}
          <path
            d="M 110 122 Q 106 134 108 142 Q 112 143 114 142 Q 116 134 112 122"
            fill="#8A5F3A"
            opacity="0.22"
          />
          <ellipse cx="107" cy="142" rx="1.8" ry="1.2" fill="#5F4023" opacity="0.35" />
          <ellipse cx="113" cy="142" rx="1.8" ry="1.2" fill="#5F4023" opacity="0.35" />

          {/* ───────── MOUSTACHE (thin) ───────── */}
          <path
            d="M 94 152 Q 102 148 110 152 Q 118 148 126 152 Q 120 156 110 156 Q 100 156 94 152 Z"
            fill="#1A1108"
          />

          {/* ───────── MOUTH ───────── */}
          <motion.path
            d={mouthPath}
            stroke="#5C2818"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill={state === "speaking" ? "#7A3220" : "none"}
            initial={false}
            animate={{ d: mouthPath }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />

          {/* ───────── CHIN STUBBLE (subtle speckle) ───────── */}
          <g opacity="0.32" fill="#1A1108">
            <circle cx="100" cy="160" r="0.55" />
            <circle cx="105" cy="162" r="0.55" />
            <circle cx="110" cy="163" r="0.55" />
            <circle cx="115" cy="162" r="0.55" />
            <circle cx="120" cy="160" r="0.55" />
            <circle cx="96" cy="158" r="0.5" />
            <circle cx="124" cy="158" r="0.5" />
            <circle cx="103" cy="157" r="0.45" />
            <circle cx="108" cy="156" r="0.45" />
            <circle cx="117" cy="156" r="0.45" />
            <circle cx="112" cy="158" r="0.45" />
          </g>

          {/* ───────── CHEEK WARMTH ───────── */}
          <ellipse cx="76" cy="134" rx="7" ry="4" fill="#D88868" opacity="0.22" />
          <ellipse cx="144" cy="134" rx="7" ry="4" fill="#D88868" opacity="0.22" />
        </svg>
      </motion.div>
    </div>
  );
}

export const Avatar = memo(AvatarImpl);
