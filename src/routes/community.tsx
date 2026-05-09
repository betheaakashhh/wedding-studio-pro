import { createFileRoute } from "@tanstack/react-router";
import { Github, MessageCircle, Bug, Lightbulb, Users, ExternalLink } from "lucide-react";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Wedding Studio" },
      { name: "description", content: "Join the Wedding Studio community: GitHub, issues, feature requests and Discord." },
      { property: "og:title", content: "Wedding Studio Community" },
      { property: "og:description", content: "Connect with other studios and the Wedding Studio team." },
    ],
  }),
  component: CommunityPage,
});

const cards = [
  { icon: Github, title: "GitHub Repository", desc: "Source releases, issues and discussions.", href: "https://github.com/betheaakashhh/weddingcardmaker", cta: "Open repo" },
  { icon: Bug, title: "Issue Tracker", desc: "Report bugs and follow ongoing fixes.", href: "https://github.com/betheaakashhh/weddingcardmaker/issues", cta: "Report a bug" },
  { icon: Lightbulb, title: "Feature Requests", desc: "Suggest features and vote on the roadmap.", href: "https://github.com/betheaakashhh/weddingcardmaker/issues/new?labels=enhancement", cta: "Request a feature" },
  { icon: MessageCircle, title: "Discussions", desc: "Tips, templates and studio workflows.", href: "https://github.com/betheaakashhh/weddingcardmaker/discussions", cta: "Join discussion" },
  { icon: Users, title: "Discord", desc: "Real-time community chat (coming soon).", href: "#", cta: "Join Discord" },
];

function CommunityPage() {
  return (
    <Section
      eyebrow="Community"
      title="Built with print studios across India."
      description="Wedding Studio is shaped by the studios that use it every day. Join the conversation."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target="_blank" rel="noreferrer"
            className="group rounded-xl border border-border/70 bg-surface/60 p-6 hover-lift block"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-surface-2 to-background border border-border/60 grid place-items-center mb-4 group-hover:border-primary/40 transition-colors">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm font-semibold mb-1.5">{c.title}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary">
              {c.cta} <ExternalLink className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border/70 bg-gradient-to-br from-surface to-background p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-maroon grid place-items-center shrink-0">
            <span className="text-background text-lg font-bold">A</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Built by</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">AetherSolve Pvt Ltd</div>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              AetherSolve builds AI-powered systems and professional software for mid-size businesses
              across India — from custom ERP and CRM to industry-specific desktop applications like Wedding Studio.
            </p>
            <a
              href="https://aethersolve.vercel.app" target="_blank" rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Visit AetherSolve <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
