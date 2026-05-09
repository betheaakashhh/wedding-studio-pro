import { motion } from "framer-motion";

interface Props {
  size?: number;
  label?: string;
  className?: string;
}

/**
 * Circular rotating loader using a marigold/wedding flower motif.
 * Pure SVG + framer-motion. Themed via currentColor (text-primary).
 */
export function WeddingLoader({ size = 64, label, className = "" }: Props) {
  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* outer rotating ring of petals (marigold) */}
        <motion.svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="absolute inset-0 text-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 360) / 12;
            return (
              <g key={i} transform={`rotate(${a} 50 50)`}>
                <ellipse
                  cx="50"
                  cy="14"
                  rx="6"
                  ry="10"
                  fill="currentColor"
                  fillOpacity={0.85}
                />
                <ellipse cx="50" cy="14" rx="2" ry="4" fill="oklch(0.95 0.12 70)" />
              </g>
            );
          })}
        </motion.svg>

        {/* inner counter-rotating mandala ring */}
        <motion.svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="absolute inset-0 text-maroon"
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.7" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${a} 50 50)`}>
                <path d="M50 28 Q53 34 50 40 Q47 34 50 28 Z" fill="currentColor" opacity="0.55" />
              </g>
            );
          })}
        </motion.svg>

        {/* pulsing center bindi */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="block rounded-full bg-gradient-to-br from-gold via-primary to-maroon shadow-[0_0_18px_oklch(0.74_0.17_45/0.7)]"
            style={{ width: size * 0.18, height: size * 0.18 }}
          />
        </motion.div>
      </div>
      {label && (
        <motion.span
          className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
