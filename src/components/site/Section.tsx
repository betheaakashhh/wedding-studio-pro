export function Section({
  eyebrow, title, description, children, className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 ${className}`}>
      <div className="max-w-2xl mb-12">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
            <span className="h-1 w-1 rounded-full bg-primary" /> {eyebrow}
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-4 text-base text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {children}
    </section>
  );
}
