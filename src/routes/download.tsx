import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Download, Copy, Check, Github, FileText, ExternalLink, HardDrive } from "lucide-react";
import { Section } from "@/components/site/Section";
import { WeddingLoader } from "@/components/site/WeddingLoader";
import { getLatestRelease } from "@/lib/github.functions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download — Wedding Studio" },
      { name: "description", content: "Download the latest version of Wedding Studio for Windows. Always up to date with the latest GitHub release." },
      { property: "og:title", content: "Download Wedding Studio" },
      { property: "og:description", content: "Get the latest Windows build of Wedding Studio." },
    ],
  }),
  component: DownloadPage,
});

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

function DownloadPage() {
  const fetchLatest = useServerFn(getLatestRelease);
  const { data, isLoading } = useQuery({
    queryKey: ["latest-release-page"],
    queryFn: () => fetchLatest(),
  });
  const [copied, setCopied] = useState(false);

  const release = data?.release;
  const winAsset =
    release?.assets.find((a) => /\.(exe|msi)$/i.test(a.name)) ??
    release?.assets[0];

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Section
      eyebrow="Download"
      title="Get Wedding Studio for Windows."
      description="Always up to date — fetched live from the latest GitHub release."
    >
      {isLoading && (
        <div className="rounded-xl border border-border/70 bg-surface/60 p-10 flex items-center justify-center">
          <WeddingLoader size={72} label="Loading latest release" />
        </div>
      )}

      {!isLoading && data?.error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
          Couldn't load the latest release ({data.error}).{" "}
          <a href="https://github.com/betheaakashhh/weddingcardmaker/releases" className="underline" target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      )}

      {release && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Primary card */}
          <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-gradient-to-br from-surface to-surface-2/40 p-8 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-72 w-72 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-success/40 bg-success/10 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Latest stable
                </span>
                {release.prerelease && (
                  <span className="px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary">Pre-release</span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="text-3xl font-semibold tracking-tight">{release.name || release.tag_name}</h3>
                <div className="text-sm text-muted-foreground font-mono">{release.tag_name}</div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
                <span>Published {release.published_at ? new Date(release.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "—"}</span>
                <span className="flex items-center gap-1.5"><HardDrive className="h-3 w-3" /> {formatBytes(winAsset?.size ?? 0)}</span>
                <span>For Windows 10 / 11 (x64)</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {winAsset && (
                  <>
                    <a
                      href={winAsset.browser_download_url}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      <Download className="h-4 w-4" /> Download {winAsset.name}
                    </a>
                    <button
                      onClick={() => copy(winAsset.browser_download_url)}
                      className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface px-4 py-3 text-sm hover:bg-surface-2"
                    >
                      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy download link"}
                    </button>
                  </>
                )}
                <a
                  href={release.html_url}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/40 px-4 py-3 text-sm hover:bg-surface"
                >
                  <ExternalLink className="h-4 w-4" /> View on GitHub
                </a>
              </div>

              {release.assets.length > 0 && (
                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">All assets</div>
                  <div className="space-y-1.5">
                    {release.assets.map((a) => (
                      <a key={a.name} href={a.browser_download_url}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-md border border-border/60 bg-background/40 hover:border-primary/40 hover:bg-surface transition-colors text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate font-mono text-xs">{a.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                          <span>{formatBytes(a.size)}</span>
                          <span>{a.download_count.toLocaleString()} downloads</span>
                          <Download className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Release notes */}
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">Release notes</div>
              <Link to="/releases" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-code:text-primary prose-code:bg-background/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded max-h-[480px] overflow-y-auto scrollbar-thin">
              {release.body ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{release.body}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground text-sm">No release notes provided.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-xl border border-border/70 bg-surface/40 p-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Github className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Always up to date</div>
            <div className="text-xs text-muted-foreground">This page fetches the latest release directly from GitHub Releases.</div>
          </div>
        </div>
        <a href="https://github.com/betheaakashhh/weddingcardmaker/releases" target="_blank" rel="noreferrer"
          className="text-xs text-primary hover:underline inline-flex items-center gap-1">
          Browse all releases <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Section>
  );
}
