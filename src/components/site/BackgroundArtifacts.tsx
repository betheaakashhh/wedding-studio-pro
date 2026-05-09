import { motion } from "framer-motion";

/**
 * Decorative Hindu wedding artifacts background.
 * Pure SVG + framer motion. No raster assets, fully themable through currentColor.
 */
export function BackgroundArtifacts() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* warm vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.74_0.17_45/0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.55_0.22_5/0.14),transparent_55%)]" />

      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating Devanagari script */}
      <FloatingDevanagari />

      {/* Mandalas */}
      <motion.div
        className="absolute -top-40 -right-40 text-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Mandala size={520} />
      </motion.div>

      <motion.div
        className="absolute -bottom-48 -left-44 text-maroon/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <Mandala size={460} />
      </motion.div>

      {/* Paisleys */}
      <motion.div
        className="absolute top-[18%] left-[8%] text-primary/30"
        animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Paisley size={64} />
      </motion.div>

      <motion.div
        className="absolute top-[36%] right-[10%] text-maroon/40"
        animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <Paisley size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-[22%] left-[18%] text-info/30"
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <Paisley size={56} />
      </motion.div>

      {/* Toran (hanging garland) at top */}
      <div className="absolute top-0 inset-x-0 flex justify-center text-primary/30">
        <Toran />
      </div>

      {/* Diya glows */}
      <Diya className="absolute bottom-10 left-[22%]" delay={0} />
      <Diya className="absolute bottom-16 right-[24%]" delay={1.5} />
    </div>
  );
}

/* ─────────── Pieces ─────────── */

function Mandala({ size = 400 }: { size?: number }) {
  const petals = 16;
  const r1 = size * 0.18;
  const r2 = size * 0.32;
  const r3 = size * 0.46;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" stroke="currentColor" strokeWidth="0.6">
      <g transform={`translate(${size / 2} ${size / 2})`}>
        <circle r={r1} />
        <circle r={r2} strokeDasharray="2 4" />
        <circle r={r3} />
        <circle r={size * 0.06} />
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i * 360) / petals;
          return (
            <g key={i} transform={`rotate(${a})`}>
              <path d={`M0 -${r1} Q ${size * 0.04} -${(r1 + r2) / 2} 0 -${r2}`} />
              <path d={`M0 -${r2} Q ${size * 0.06} -${(r2 + r3) / 2} 0 -${r3}`} />
              <circle cy={-r3} r="2.2" fill="currentColor" />
            </g>
          );
        })}
        {Array.from({ length: petals * 2 }).map((_, i) => {
          const a = (i * 360) / (petals * 2);
          return <line key={`l${i}`} transform={`rotate(${a})`} y1={r3 + 6} y2={r3 + 18} />;
        })}
      </g>
    </svg>
  );
}

function Paisley({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M14 50 C 14 20, 40 6, 52 18 C 60 30, 44 46, 30 44 C 20 42, 18 36, 22 30 C 26 24, 36 24, 38 30" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <path d="M22 38 Q 28 32 34 38" />
      <path d="M40 22 Q 44 26 40 30" />
    </svg>
  );
}

function Toran() {
  return (
    <svg width="900" height="120" viewBox="0 0 900 120" fill="none" stroke="currentColor" strokeWidth="0.8" className="max-w-full opacity-70">
      {/* string */}
      <path d="M20 18 Q 450 60 880 18" />
      {/* mango leaves */}
      {Array.from({ length: 22 }).map((_, i) => {
        const t = i / 21;
        const x = 20 + t * 860;
        const y = 18 + Math.sin(t * Math.PI) * 42;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0 Q 8 18 0 36 Q -8 18 0 0 Z" fill="currentColor" fillOpacity="0.35" />
            <line y2="6" />
          </g>
        );
      })}
      {/* marigold accents */}
      {[0.18, 0.5, 0.82].map((t, i) => {
        const x = 20 + t * 860;
        const y = 18 + Math.sin(t * Math.PI) * 42 + 40;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="6" fill="currentColor" fillOpacity="0.5" />
            <circle r="2.5" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

function Diya({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={className} aria-hidden>
      <svg width="46" height="60" viewBox="0 0 46 60" fill="none">
        {/* flame */}
        <motion.g
          animate={{ scaleY: [1, 1.12, 0.96, 1.08, 1], scaleX: [1, 0.94, 1.04, 0.96, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay }}
          style={{ transformOrigin: "23px 30px" }}
        >
          <path d="M23 6 C 28 16 30 22 27 28 C 25 32 21 32 19 28 C 16 22 18 16 23 6 Z" fill="oklch(0.85 0.18 65)" />
          <path d="M23 14 C 26 20 27 24 25 27 C 23 30 21 28 21 25 C 21 22 22 18 23 14 Z" fill="oklch(0.95 0.12 95)" />
        </motion.g>
        {/* glow */}
        <motion.circle
          cx="23" cy="22" r="14"
          fill="oklch(0.85 0.18 65)" fillOpacity="0.15"
          animate={{ r: [14, 18, 14], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
        />
        {/* lamp */}
        <path d="M6 38 Q 23 56 40 38 Z" fill="oklch(0.42 0.08 35)" stroke="oklch(0.74 0.17 45)" strokeWidth="0.8" />
        <ellipse cx="23" cy="38" rx="17" ry="3" fill="oklch(0.32 0.05 35)" />
      </svg>
    </div>
  );
}

function FloatingDevanagari() {
  // Auspicious & wedding-related glyphs/words
  const tokens = [
    "ॐ", "श्री", "विवाह", "मंगल", "शुभ", "स्नेह", "सुहाग",
    "अक्षत", "वरमाला", "सप्तपदी", "रिश्ता", "प्रेम",
    "ॐ", "श्री", "मंगल",
  ];
  return (
    <div className="absolute inset-0">
      {tokens.map((t, i) => {
        const left = (i * 73) % 100;
        const size = 28 + ((i * 17) % 64);
        const duration = 18 + ((i * 7) % 18);
        const delay = (i * 1.7) % 12;
        return (
          <span
            key={i}
            className="font-devanagari absolute text-primary/15 select-none whitespace-nowrap animate-drift"
            style={{
              left: `${left}%`,
              bottom: `-40px`,
              fontSize: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
            }}
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}
