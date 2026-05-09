import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Github } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Download", to: "/download" },
      { label: "Releases", to: "/releases" },
      { label: "Documentation", to: "/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Getting Started", to: "/docs" },
      { label: "Community", to: "/community" },
      { label: "Changelog", to: "/releases" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "AetherSolve", href: "https://aethersolve.vercel.app" },
      { label: "GitHub", href: "https://github.com/betheaakashhh/release" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional wedding card and invitation design software for print studios.
              Built by AetherSolve Pvt Ltd.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> All systems operational
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">
                {c.title}
              </div>
              <ul className="space-y-2.5">
                {c.links.map((l: any) => (
                  <li key={l.label}>
                    {"to" in l ? (
                      <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AetherSolve Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <a href="https://github.com/betheaakashhh/release" target="_blank" rel="noreferrer" className="hover:text-foreground inline-flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
