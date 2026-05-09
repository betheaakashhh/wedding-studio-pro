import { motion } from "framer-motion";
import { FEATURES } from "@/lib/features";

export function FeatureGrid({ limit }: { limit?: number }) {
  const items = limit ? FEATURES.slice(0, limit) : FEATURES;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
          className="group relative rounded-xl border border-border/70 bg-surface/60 p-6 hover-lift"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-surface-2 to-background border border-border/60 grid place-items-center mb-4 group-hover:border-primary/40 transition-colors">
            <f.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="text-sm font-semibold text-foreground mb-1.5">{f.title}</div>
          <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
        </motion.div>
      ))}
    </div>
  );
}
