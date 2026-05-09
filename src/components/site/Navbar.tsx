import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "./Logo";
import { Download, Menu, X, Github, Sparkles } from "lucide-react";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/download", label: "Download" },
  { to: "/releases", label: "Releases" },
  { to: "/docs", label: "Docs" },
  { to: "/community", label: "Community" },
];

function GallopingHorse() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dust trail */}
      <motion.div
        aria-hidden
        initial={{ x: "-10%" }}
        animate={{ x: "110%" }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 0.2 }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] w-40 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[2px]"
      />
      {/* horse */}
      <motion.div
        initial={{ x: "-15%" }}
        animate={{ x: "115%" }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, -2, 0, -1, 0] }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="46"
            height="32"
            viewBox="0 0 120 80"
            fill="none"
            className="text-primary/55 drop-shadow-[0_0_8px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
          >
            {/* stylized galloping horse silhouette */}
            <path
              fill="currentColor"
              d="M8 58c4-2 9-3 14-2l6-3c2-6 6-11 12-14l-2-6 5 1 2 4c5-1 10-1 15 1l8-10c2-2 5-3 8-2 2 1 3 3 2 5l-3 6 10 4c4 2 7 5 9 9l8 2c3 1 5 3 5 6 0 2-2 4-4 4l-9-1-3 6-7-2-2 6h-5l-3-7-10 1-2 7h-5l-1-7-12-1-3 7h-5l-1-7-9-2-4 6H9c-2 0-3-1-3-3 0-2 1-3 2-4z"
            />
            {/* mane flutter */}
            <path
              fill="currentColor"
              opacity="0.7"
              d="M70 22l-6 6 4 1-3 5 5-1-1 4 4-2 1-6z"
            />
            {/* tail */}
            <path
              fill="currentColor"
              opacity="0.65"
              d="M8 50c-4 1-7 4-8 8l5-1-3 5 6-2-1 4 5-3 2-7z"
            />
            {/* small wedding plume on head */}
            <circle cx="92" cy="14" r="2" fill="currentColor" opacity="0.9" />
            <circle cx="95" cy="10" r="1.5" fill="currentColor" opacity="0.7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number; show: boolean }>({
    x: 0, w: 0, show: false,
  });
  const location = useLocation();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  useEffect(() => {
    const target =
      hoverIdx !== null
        ? itemRefs.current[hoverIdx]
        : itemRefs.current[nav.findIndex((n) => location.pathname.startsWith(n.to))];
    const wrap = navRef.current;
    if (!target || !wrap) {
      setIndicator((p) => ({ ...p, show: false }));
      return;
    }
    const tr = target.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    setIndicator({ x: tr.left - wr.left, w: tr.width, show: true });
  }, [hoverIdx, location.pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        animate={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--surface) 75%, transparent)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(0px)",
          borderColor: scrolled ? "color-mix(in oklab, white 8%, transparent)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className="relative border-b"
      >
        {/* decorative galloping wedding horse */}
        <GallopingHorse />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <motion.span
              whileHover={{ rotate: 6, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className="inline-flex"
            >
              <Logo />
            </motion.span>
          </Link>

          <nav
            ref={navRef}
            onMouseLeave={() => setHoverIdx(null)}
            className="hidden md:flex relative items-center gap-0.5"
          >
            <AnimatePresence>
              {indicator.show && (
                <motion.span
                  layout
                  initial={false}
                  animate={{ x: indicator.x, width: indicator.w, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute top-1/2 -translate-y-1/2 h-9 rounded-md bg-surface/80 border border-border/60 -z-0"
                  style={{ left: 0 }}
                />
              )}
            </AnimatePresence>
            {nav.map((n, i) => {
              const active = location.pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onMouseEnter={() => setHoverIdx(i)}
                  className="relative z-10 px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {n.label}
                    {active && (
                      <motion.span
                        layoutId="active-dot"
                        className="h-1 w-1 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/betheaakashhh/weddingcardmaker"
              target="_blank" rel="noreferrer"
              className="group p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
            </a>
            <Link
              to="/download"
              className="group relative inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground overflow-hidden shadow-[0_8px_24px_-8px_oklch(0.74_0.17_45/0.7)] hover:shadow-[0_12px_28px_-8px_oklch(0.74_0.17_45/0.9)] transition-shadow"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <Download className="relative h-3.5 w-3.5" />
              <span className="relative">Download</span>
              <Sparkles className="relative h-3 w-3 opacity-70" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-surface relative"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden glass border-t border-border/60 overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface rounded-md"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/download"
                onClick={() => setOpen(false)}
                className="block mt-2 px-3 py-2.5 text-sm text-center font-medium bg-primary text-primary-foreground rounded-md"
              >
                Download for Windows
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
