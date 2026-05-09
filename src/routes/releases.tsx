import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Tag, Calendar, Download, ChevronRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { WeddingLoader } from "@/components/site/WeddingLoader";
import { getAllReleases, type Release } from "@/lib/github.functions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "Changelog — Wedding Studio" },
      { name: "description", content: "Every release of Wedding Studio with notes, downloads and a searchable timeline." },
      { property: "og:title", content: "Wedding Studio Changelog" },
      { property: "og:description", content: "Browse all releases of Wedding Studio." },
    ],
  }),
  component: ReleasesPage,
});

function ReleasesPage() {
  const fetchAll = useServerFn(getAllReleases);
  const { data, isLoading } = useQuery({ queryKey: ["all-releases"], queryFn: () => fetchAll() });
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);

  const releases = data?.releases ?? [];
  const filtered = useMemo(() => {
    if (!q.trim()) return releases;
    const t = q.toLowerCase();
    return releases.filter(
      (r) => r.tag_name.toLowerCase().includes(t) || r.name?.toLowerCase().includes(t) || r.body?.toLowerCase().includes(t),
    );
  }, [releases, q]);

  return (
    <Section
      eyebrow="Changelog"
      title="Every release, in one place."
      description="A complete timeline of Wedding Studio releases, fetched live from GitHub."
    >
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search releases…"
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md bg-surface border border-border/70 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
            />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">Versions</div>
          <nav className="max-h-[60vh] overflow-y-auto scrollbar-thin space-y-0.5">
            {filtered.map((r) => (
              <a
                key={r.id}
                href={`#release-${r.id}`}
                onClick={() => setActiveId(r.id)}
                className={`flex items-center justify-between gap-2 text-xs px-2.5 py-2 rounded-md transition-colors ${
                  activeId === r.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                <span className="font-mono truncate">{r.tag_name}</span>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </a>
            ))}
            {filtered.length === 0 && !isLoading && (
              <div className="text-xs text-muted-foreground px-2.5">No releases found.</div>
            )}
          </nav>
        </aside>

        <div className="min-w-0">
          {isLoading && (
            <div className="flex justify-center py-10">
              <WeddingLoader size={64} label="Loading releases" />
            </div>
          )}
          {data?.error && <div className="text-destructive text-sm">{data.error}</div>}

          <div className="space-y-6 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border hidden sm:block" />
            {filtered.map((r) => (
              <ReleaseCard key={r.id} r={r} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ReleaseCard({ r }: { r: Release }) {
  const [open, setOpen] = useState(false);
  const winAsset = r.assets.find((a) => /\.(exe|msi)$/i.test(a.name)) ?? r.assets[0];

  return (
    <article id={`release-${r.id}`} className="relative sm:pl-12 scroll-mt-24">
      <div className="hidden sm:flex absolute left-0 top-5 h-8 w-8 rounded-full border border-border bg-surface items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <div className="rounded-xl border border-border/70 bg-surface/60 overflow-hidden hover-lift">
        <header className="p-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold tracking-tight">{r.name || r.tag_name}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Tag className="h-2.5 w-2.5" /> {r.tag_name}
              </span>
              {r.prerelease && (
                <span className="px-2 py-0.5 text-[10px] rounded-full border border-info/40 bg-info/10 text-info">pre-release</span>
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {r.published_at ? new Date(r.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "Unpublished"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {winAsset && (
              <a
                href={winAsset.browser_download_url}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-3 w-3" /> Download
              </a>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-xs px-3 py-1.5 rounded-md border border-border/80 bg-surface hover:bg-surface-2"
            >
              {open ? "Collapse" : "Expand"}
            </button>
          </div>
        </header>
        {open && (
          <div className="px-6 pb-6 border-t border-border/60 pt-5">
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-code:text-primary prose-code:bg-background/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-background/80 prose-pre:border prose-pre:border-border/60">
              {r.body ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{r.body}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground text-sm">No notes for this release.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
