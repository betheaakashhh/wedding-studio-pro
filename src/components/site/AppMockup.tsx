import { motion } from "framer-motion";

export function AppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-tr from-primary/20 via-maroon/10 to-info/20 blur-3xl opacity-60 -z-10" />

      <div className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border/60">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-xs text-muted-foreground font-mono">Wedding Studio — Untitled.wsd</div>
          <div className="text-xs text-muted-foreground">●</div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-12 h-[420px] sm:h-[520px]">
          {/* Left tools */}
          <div className="col-span-1 border-r border-border/60 bg-surface-2/60 py-3 flex flex-col items-center gap-2">
            {["▣", "T", "○", "◇", "⬚", "✎", "★", "⚙"].map((g, i) => (
              <div key={i} className={`h-9 w-9 rounded-md flex items-center justify-center text-sm ${i === 1 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-surface"}`}>
                {g}
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="col-span-8 relative grid-bg bg-background/60 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative aspect-[3/4] w-[260px] sm:w-[300px] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-primary/30 rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3">शुभ विवाह</div>
                <div className="h-px w-12 bg-primary/60 mb-4" />
                <div className="font-serif text-2xl text-foreground leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  Aarav <span className="text-primary">&</span> Diya
                </div>
                <div className="mt-3 text-[10px] text-muted-foreground tracking-widest">14 · 02 · 2026</div>
                <div className="mt-6 text-[9px] text-muted-foreground/80 leading-relaxed max-w-[180px]">
                  Request the honour of your presence at the celebration of their wedding
                </div>
                <div className="mt-auto pt-6 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-sm border border-primary/40 grid place-items-center text-[8px] text-primary">QR</div>
                  <div className="text-left">
                    <div className="text-[8px] text-muted-foreground">RSVP</div>
                    <div className="text-[9px] text-foreground">studio.app</div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* canvas indicator */}
            <div className="absolute top-3 left-3 text-[10px] text-muted-foreground font-mono bg-surface/60 px-2 py-1 rounded">Canvas · 5x7in · 300dpi</div>
            <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground font-mono bg-surface/60 px-2 py-1 rounded">125%</div>
          </div>

          {/* Right panel */}
          <div className="col-span-3 border-l border-border/60 bg-surface-2/60 p-3 space-y-3 overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Layers</div>
            {["Background", "Border Frame", "Couple Names", "Date Line", "QR Code", "RSVP Block"].map((l, i) => (
              <div key={l} className={`flex items-center justify-between text-xs px-2 py-1.5 rounded ${i === 2 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface"}`}>
                <span className="truncate">{l}</span>
                <span className="opacity-60">●</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-border/60">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Typography</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground"><span>Family</span><span className="text-foreground">Cormorant</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Size</span><span className="text-foreground">36 pt</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Tracking</span><span className="text-foreground">+24</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="text-success">● Saved</span>
            <span>x: 248  y: 312</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CMYK</span><span>Bleed: 3mm</span><span>v2.4.1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
