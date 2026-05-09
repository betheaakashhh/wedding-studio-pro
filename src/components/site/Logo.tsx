export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-gold to-maroon flex items-center justify-center shadow-lg shadow-gold/20">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-background" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4 7l4 12 4-9 4 9 4-12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">Wedding Studio</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">by AetherSolve</div>
      </div>
    </div>
  );
}
