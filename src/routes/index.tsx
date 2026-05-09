import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, FileText, Github, Star, ChevronRight, Check, Terminal } from "lucide-react";
import { AppMockup } from "@/components/site/AppMockup";
import { FeatureGrid } from "@/components/site/FeatureGrid";
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
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute inset-0 radial-spot pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] bg-gradient-to-b from-primary/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Latest stable {version}
              </span>
              <a
                href="https://github.com/betheaakashhh/release"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Star className="h-3 w-3 text-primary" /> {stats?.stats?.stars ?? "—"} on GitHub
              </a>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-[11px] text-muted-foreground">
                Available for Windows
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight max-w-4xl">
              Design wedding invitations,
              <br />
              <span className="gradient-text">built for print studios.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              A professional desktop application for designing wedding cards and invitations.
              Multi-canvas workflow, native Devanagari typography, QR generation, and print-ready exports — all offline.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/download" className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <Download className="h-4 w-4" /> Download for Windows
                <ChevronRight className="h-3.5 w-3.5 -ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/releases" className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/40 px-5 py-3 text-sm font-medium hover:bg-surface transition-colors">
                <FileText className="h-4 w-4" /> View Release Notes
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Windows 10/11</span>
              <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Free updates</span>
              <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-success" /> Works offline</span>
            </div>
          </motion.div>

          <div className="mt-16 sm:mt-20">
            <AppMockup />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { k: "300 DPI", v: "Print-ready output" },
            { k: "Unicode", v: "Devanagari & Latin" },
            { k: "Offline", v: "Native performance" },
            { k: "PDF/X-1a", v: "Press-ready exports" },
          ].map((s) => (
            <div key={s.k}>
              <div className="text-xl font-semibold tracking-tight">{s.k}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <Section
        eyebrow="Built for studios"
        title="Everything your print studio needs."
        description="Wedding Studio combines a focused canvas, professional typography and a print-grade export pipeline into one native application."
      >
        <FeatureGrid limit={9} />
        <div className="mt-8 text-center">
          <Link to="/features" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Explore all features <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Live preview */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
              <span className="h-1 w-1 rounded-full bg-primary" /> Live preview
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">A workspace that gets out of your way.</h2>
            <p className="mt-4 text-muted-foreground">A code-editor inspired UI tuned for design — dark, dense and fast.</p>
          </div>
          <AppMockup />
        </div>
      </section>

      {/* Quick install */}
      <Section eyebrow="Get started" title="Install in seconds." description="One installer. No accounts, no cloud setup. Open, design, export.">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border/70 bg-surface/60 p-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Terminal className="h-3.5 w-3.5" /> windows · powershell
            </div>
            <pre className="font-mono text-sm text-foreground/90 bg-background/60 rounded-md p-4 border border-border/60 overflow-x-auto">
{`# 1. Download the latest installer
Start-Process "https://github.com/betheaakashhh/release/releases/latest"

# 2. Run WeddingStudio-Setup.exe
# 3. Launch and create your first canvas`}
            </pre>
          </div>
          <div className="rounded-xl border border-border/70 bg-surface/60 p-6 flex flex-col">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Latest release</div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-3xl font-semibold tracking-tight">{version}</div>
              {latest?.release?.published_at && (
                <div className="text-xs text-muted-foreground">
                  released {new Date(latest.release.published_at).toLocaleDateString()}
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Stable Windows build with the latest typography improvements and export pipeline updates.
            </p>
            <div className="mt-auto pt-6 flex flex-wrap gap-2">
              <Link to="/download" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Download className="h-3.5 w-3.5" /> Download
              </Link>
              <a href="https://github.com/betheaakashhh/release" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface px-4 py-2 text-sm hover:bg-surface-2">
                <Github className="h-3.5 w-3.5" /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-surface to-background p-10 sm:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[600px] bg-primary/20 blur-3xl rounded-full" />
          <div className="relative">
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">Ready to design your next invitation?</h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Built by AetherSolve Pvt Ltd — software for the studios that print India's celebrations.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/download" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Download className="h-4 w-4" /> Download Wedding Studio
              </Link>
              <Link to="/docs" className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/40 px-5 py-3 text-sm hover:bg-surface">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
