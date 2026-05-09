export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-gold via-primary to-maroon flex items-center justify-center shadow-lg shadow-primary/30 ring-1 ring-white/10">
        <span className="font-devanagari text-background text-[15px] font-bold leading-none drop-shadow-sm">
          वि
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-maroon ring-2 ring-background" />
      </div>
      <div className="leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className="font-devanagari text-[17px] font-semibold text-foreground tracking-tight">
            वेडिंग
          </span>
          <span className="text-[15px] font-light italic text-foreground/90 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Studio
          </span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground -mt-0.5">
          by AetherSolve
        </div>
      </div>
    </div>
  );
}
