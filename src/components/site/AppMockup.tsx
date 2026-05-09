import { motion } from "framer-motion";
import appScreenshot from "@/assets/app-screenshot.png";

export function AppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-full max-w-6xl"
    >
      {/* Glow */}
      <div className="absolute -inset-x-10 -inset-y-8 bg-gradient-to-tr from-primary/25 via-maroon/10 to-info/20 blur-3xl opacity-60 -z-10" />

      <div className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-2xl shadow-black/70 ring-1 ring-white/5">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border/60">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-xs text-muted-foreground font-mono">Wedding Studio v2 — Screen Print Pro</div>
          <div className="text-[10px] text-muted-foreground font-mono opacity-70">● recording</div>
        </div>

        {/* Screenshot */}
        <img
          src={appScreenshot}
          alt="Wedding Studio desktop application showing the canvas, layer tools, and design panels"
          className="block w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Floating annotations */}
      <div className="hidden md:flex absolute -left-3 top-1/3 -translate-x-full items-center gap-2 text-[10px] font-mono text-muted-foreground">
        <span className="px-2 py-1 rounded-md border border-border/70 bg-surface/80 backdrop-blur">Layer panel</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <div className="hidden md:flex absolute -right-3 top-1/2 translate-x-full items-center gap-2 text-[10px] font-mono text-muted-foreground">
        <span className="h-px w-8 bg-border" />
        <span className="px-2 py-1 rounded-md border border-border/70 bg-surface/80 backdrop-blur">Canvas · 210×148mm</span>
      </div>
    </motion.div>
  );
}
