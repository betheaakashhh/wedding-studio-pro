import appIcon from "@/assets/app-icon.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gradient-to-br from-gold/30 via-primary/20 to-maroon/30 ring-1 ring-white/10 shadow-lg shadow-primary/30">
        <img
          src={appIcon}
          alt="Wedding Studio"
          className="h-full w-full object-cover"
          draggable={false}
        />
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
