import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Download, FileText, Github, Star, ChevronRight, Check, Terminal, Copy,
  Cpu, Zap, Shield, Layers, Type, Palette, ArrowUpRight, Command, Sparkles,
} from "lucide-react";
import { AppMockup } from "@/components/site/AppMockup";
import { BackgroundArtifacts } from "@/components/site/BackgroundArtifacts";
import { Section } from "@/components/site/Section";
import { getLatestRelease, getRepoStats } from "@/lib/github.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wedding Studio — Design software for print studios" },
      { name: "description", content: "Professional desktop application for wedding card and invitation design. Multi-canvas, Devanagari typography, print-ready exports." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const fetchLatest = useServerFn(getLatestRelease);
  const fetchStats = useServerFn(getRepoStats);

  const { data: latest } = useQuery({ queryKey: ["latest-release"], queryFn: () => fetchLatest() });
  const { data: stats } = useQuery({ queryKey: ["repo-stats"], queryFn: () => fetchStats() });

  const version = latest?.release?.tag_name ?? "v1.0.0";

  return (
    <>
      <Hero version={version} stars={stats?.stats?.stars} />
      <MarqueeStrip />
      <FeatureShowcase />
      <WorkflowSection />
      <PreviewSection />
      <InstallSection version={version} publishedAt={latest?.release?.published_at ?? undefined} />
      <FinalCTA />
    </>
  );
}

/* ─────────────────────────────────────────────  HERO  ───────────────────────────────────────────── */

function Hero({ version, stars }: { version: string; stars?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border/50">
      {/* Hindu wedding artifacts background */}
      <BackgroundArtifacts />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24"
      >
        {/* announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <a
            href="https://github.com/betheaakashhh/weddingcardmaker/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 backdrop-blur px-3 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
              <Sparkles className="h-2.5 w-2.5" /> New
            </span>
            <span>Wedding Studio {version} is now available</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* headline */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em]"
          >
            The design suite
            <br />
            <span className="relative inline-block">
              <span className="gradient-text">made for studios.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 -bottom-1 h-[3px] w-full origin-left bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            A professional, native desktop application for wedding card design.
            Built for speed, typography precision, and print-ready output —
            entirely offline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/download"
              className="group relative inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.78_0.12_85_/_0.6)] hover:shadow-[0_14px_50px_-10px_oklch(0.78_0.12_85_/_0.8)] transition-all"
            >
              <span className="absolute inset-0 rounded-md bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="relative h-4 w-4" />
              <span className="relative">Download for Windows</span>
              <ChevronRight className="relative h-3.5 w-3.5 -ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => navigator.clipboard.writeText("winget install WeddingStudio")}
              className="group inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/40 backdrop-blur px-4 py-3 font-mono text-xs hover:bg-surface hover:border-primary/30 transition-colors"
            >
              <span className="text-primary">$</span>
              <span className="text-foreground/90">winget install WeddingStudio</span>
              <Copy className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Windows 10/11</span>
            <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Free updates</span>
            <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Works offline</span>
            <a
              href="https://github.com/betheaakashhh/weddingcardmaker"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Star className="h-3 w-3 text-primary" /> {stars ?? "—"} on GitHub
            </a>
          </motion.div>
        </div>

        {/* mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 sm:mt-24"
        >
          <AppMockup />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────  MARQUEE STRIP  ───────────────────────────────────────── */

function MarqueeStrip() {
  const items = [
    "300 DPI Print Output",
    "PDF/X-1a Export",
    "Devanagari Unicode",
    "CMYK Separations",
    "ICC Color Profiles",
    "Crop & Bleed Marks",
    "Variable Fonts",
    "Multi-Canvas",
    "QR Generation",
    "Layer System",
  ];
  return (
    <section className="relative border-b border-border/50 overflow-hidden bg-surface/30">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 py-5 whitespace-nowrap"
      >
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            {t}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────  FEATURE SHOWCASE (bento)  ───────────────────────────────────────── */

function FeatureShowcase() {
  return (
    <Section
      eyebrow="Engineered for studios"
      title="Built around the realities of print."
      description="Every detail — from typography rendering to color separations — is tuned for production-grade output."
    >
      <div className="grid grid-cols-12 gap-4 auto-rows-[180px]">
        <BentoCard
          className="col-span-12 md:col-span-7 row-span-2"
          icon={Layers}
          title="Multi-canvas workflow"
          desc="Design front, back, inserts and envelope side-by-side. Switch contexts without losing focus."
        >
          <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-3">
            {["Front", "Back", "Insert"].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[3/4] rounded-md border border-border/70 bg-gradient-to-br from-surface-2 to-background p-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="h-1 w-8 bg-primary/60 rounded-full" />
                  <div className="h-1 w-12 bg-muted rounded-full" />
                </div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          className="col-span-12 md:col-span-5"
          icon={Type}
          title="Devanagari typography"
          desc="Native Unicode rendering with conjuncts, ligatures and proper baseline."
        >
          <div className="absolute right-6 top-6 text-5xl font-serif text-primary/80 leading-none">अ</div>
        </BentoCard>

        <BentoCard
          className="col-span-12 md:col-span-5"
          icon={Zap}
          title="Native performance"
          desc="Built native for Windows. Instant launch, zero latency, fully offline."
        >
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-1">
            {[12, 20, 16, 28, 22, 34, 26].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: h }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="w-1 bg-gradient-to-t from-primary/30 to-primary rounded-full"
              />
            ))}
          </div>
        </BentoCard>

        <BentoCard
          className="col-span-6 md:col-span-4"
          icon={Palette}
          title="CMYK pipeline"
          desc="ICC profiles & color separations."
        >
          <div className="absolute right-5 top-5 flex -space-x-2">
            {["#22D3EE", "#EC4899", "#FACC15", "#1E1E1E"].map((c) => (
              <div key={c} className="h-7 w-7 rounded-full ring-2 ring-surface" style={{ background: c }} />
            ))}
          </div>
        </BentoCard>

        <BentoCard
          className="col-span-6 md:col-span-4"
          icon={Shield}
          title="Privacy first"
          desc="Files stay local. No cloud, no telemetry."
        />

        <BentoCard
          className="col-span-12 md:col-span-4"
          icon={Cpu}
          title="Press-ready exports"
          desc="PDF/X-1a, crop marks, bleed."
        />
      </div>
    </Section>
  );
}

function BentoCard({
  className = "", icon: Icon, title, desc, children,
}: {
  className?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-xl border border-border/70 bg-surface/40 p-6 hover:border-primary/40 hover:bg-surface/70 transition-all ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />
      <div className="relative">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="h-8 w-8 rounded-md bg-surface-2 border border-border/60 grid place-items-center group-hover:border-primary/40 transition-colors">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="text-base font-semibold tracking-tight">{title}</div>
        <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-[28ch]">{desc}</div>
      </div>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────  WORKFLOW (numbered)  ───────────────────────────────────────── */

function WorkflowSection() {
  const steps = [
    { k: "01", title: "Set up your canvas", desc: "Choose paper size, orientation, bleed and safe area. Templates for invitations, RSVP, and inserts.", icon: Layers },
    { k: "02", title: "Design with precision", desc: "Type with native Devanagari, place graphics, work in CMYK with ICC profiles applied.", icon: Type },
    { k: "03", title: "Export for press", desc: "One-click PDF/X-1a with crop marks, bleed and color separations ready for your printer.", icon: FileOutputAlias },
  ];
  return (
    <Section
      eyebrow="Workflow"
      title="From blank canvas to printed card."
      description="Three steps. Zero friction. Production-grade output every time."
    >
      <div className="grid md:grid-cols-3 gap-4 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-xl border border-border/70 bg-surface/40 p-7 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-muted-foreground tracking-widest">{s.k}</span>
              <div className="h-9 w-9 rounded-lg border border-border/60 bg-background grid place-items-center">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-lg font-semibold tracking-tight">{s.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// alias so we don't add another lucide import line
import { FileOutput as FileOutputAlias } from "lucide-react";

/* ─────────────────────────────────────────  PREVIEW  ───────────────────────────────────────── */

function PreviewSection() {
  return (
    <section className="relative border-y border-border/50 bg-surface/20">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
            <span className="h-1 w-1 rounded-full bg-primary" /> Live preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">A workspace that disappears.</h2>
          <p className="mt-4 text-muted-foreground">A code-editor inspired UI tuned for design — dark, dense and fast.</p>
        </div>
        <AppMockup />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────  INSTALL  ───────────────────────────────────────── */

function InstallSection({ version, publishedAt }: { version: string; publishedAt?: string }) {
  return (
    <Section eyebrow="Get started" title="Install in seconds." description="One installer. No accounts, no cloud setup. Open, design, export.">
      <div className="grid lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="lg:col-span-3 rounded-xl border border-border/70 bg-surface/60 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-surface-2/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" /> windows · powershell
            </div>
            <Command className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <pre className="font-mono text-[13px] text-foreground/90 p-5 overflow-x-auto leading-relaxed">
{`# 1. Install via winget
winget install WeddingStudio

# 2. Or download the latest installer
Start-Process "https://github.com/betheaakashhh/weddingcardmaker/releases/latest"

# 3. Launch and create your first canvas`}
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-xl border border-border/70 bg-gradient-to-br from-surface to-background p-6 flex flex-col"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Latest release</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-3xl font-semibold tracking-tight">{version}</div>
            {publishedAt && (
              <div className="text-xs text-muted-foreground">
                {new Date(publishedAt).toLocaleDateString()}
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Stable Windows build with the latest typography and export improvements.
          </p>
          <div className="mt-auto pt-6 flex flex-wrap gap-2">
            <Link to="/download" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Download className="h-3.5 w-3.5" /> Download
            </Link>
            <a href="https://github.com/betheaakashhh/weddingcardmaker" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface/60 px-4 py-2 text-sm hover:bg-surface-2">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────  FINAL CTA  ───────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-surface to-background p-10 sm:p-16 text-center">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[700px] bg-primary/20 blur-3xl rounded-full"
        />
        <div className="relative">
          <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
            Ready to design your next invitation?
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Built by AetherSolve Pvt Ltd — software for the studios that print India's celebrations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/download" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_oklch(0.78_0.12_85_/_0.6)]">
              <Download className="h-4 w-4" /> Download Wedding Studio
            </Link>
            <Link to="/docs" className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/40 px-6 py-3 text-sm hover:bg-surface">
              Read the docs <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
