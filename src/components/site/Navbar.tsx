import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Download, Menu, X, Github } from "lucide-react";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/download", label: "Download" },
  { to: "/releases", label: "Releases" },
  { to: "/docs", label: "Docs" },
  { to: "/community", label: "Community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center"><Logo /></Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "px-3 py-2 text-sm text-foreground rounded-md bg-surface" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/betheaakashhh/release"
            target="_blank" rel="noreferrer"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            to="/download"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </Link>
        </div>

        <button className="md:hidden p-2 rounded-md hover:bg-surface" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/60 px-5 py-4 space-y-1">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface rounded-md">
              {n.label}
            </Link>
          ))}
          <Link to="/download" onClick={() => setOpen(false)}
            className="block mt-2 px-3 py-2.5 text-sm text-center font-medium bg-primary text-primary-foreground rounded-md">
            Download for Windows
          </Link>
        </div>
      )}
    </header>
  );
}
