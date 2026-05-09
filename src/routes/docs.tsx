import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Search, Book, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Wedding Studio" },
      { name: "description", content: "Documentation for Wedding Studio: installation, getting started, canvas system, typography, exports and printing workflow." },
      { property: "og:title", content: "Wedding Studio Documentation" },
      { property: "og:description", content: "Learn Wedding Studio from installation to print production." },
    ],
  }),
  component: DocsPage,
});

const SECTIONS = [
  {
    id: "installation",
    title: "Installation",
    body: `Download the latest installer from the Download page. Run WeddingStudio-Setup.exe and follow the prompts. Wedding Studio works on Windows 10 and Windows 11 (x64). The first launch may take a few extra seconds while fonts and templates are indexed.`,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    body: `Create a new project from File → New, choose a paper preset (5x7", A5, square), and pick a template or start blank. Use the toolbar on the left to add shapes, text and images. Press B at any time to enter Blueprint mode and inspect spacing, alignment and structure.`,
  },
  {
    id: "canvas-system",
    title: "Canvas System",
    body: `Wedding Studio supports multi-canvas projects so you can design front, back, inserts and envelopes side-by-side. Each canvas has its own size, bleed and slug. Use Canvas → Add to add a new canvas, or duplicate an existing one with Ctrl+Shift+D.`,
  },
  {
    id: "typography",
    title: "Typography",
    body: `Native Devanagari and Latin OpenType support. Apply paragraph and character styles, enable optical sizing on variable fonts, and use the baseline grid for vertical rhythm. Custom fonts are managed per-project — no system installs needed.`,
  },
  {
    id: "exporting",
    title: "Exporting",
    body: `Export from File → Export. Choose PDF/X-1a for press, PDF for digital sharing, or PNG/JPEG for previews. Embedded ICC profiles, CMYK separations and crop marks are available in the export dialog.`,
  },
  {
    id: "templates",
    title: "Templates",
    body: `Start from a curated library of templates designed for Indian weddings — traditional, modern minimal, and regional motif sets. Save your own templates from File → Save as Template to reuse across projects.`,
  },
  {
    id: "printing-workflow",
    title: "Printing Workflow",
    body: `For commercial print, configure 3mm bleed, set CMYK color mode and embed all fonts. Wedding Studio's Preflight panel checks resolution, ink coverage, missing fonts and out-of-gamut colors before export.`,
  },
  {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    body: `Common shortcuts: Ctrl+N (new), Ctrl+S (save), Ctrl+E (export), Ctrl+G (group), V (move), T (text), R (rectangle), B (blueprint), Space+drag (pan), Ctrl+0 (fit canvas).`,
  },
];

function DocsPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(SECTIONS[0].id);
  const items = SECTIONS.filter((s) => s.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <Section
      eyebrow="Documentation"
      title="Learn Wedding Studio."
      description="Everything you need to ship beautiful, press-ready invitations."
    >
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search docs…"
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md bg-surface border border-border/70 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">Topics</div>
          <nav className="space-y-0.5">
            {items.map((s) => (
              <a
                key={s.id} href={`#${s.id}`} onClick={() => setActive(s.id)}
                className={`flex items-center justify-between gap-2 text-xs px-2.5 py-2 rounded-md transition-colors ${
                  active === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                <span>{s.title}</span>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-12 min-w-0">
          {items.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Book className="h-3.5 w-3.5" /> {s.title}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
