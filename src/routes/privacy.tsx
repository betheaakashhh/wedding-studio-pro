import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Wedding Studio" }, { name: "description", content: "Privacy policy for Wedding Studio." }] }),
  component: () => (
    <Section eyebrow="Legal" title="Privacy Policy">
      <div className="prose prose-invert max-w-3xl prose-p:text-muted-foreground">
        <p>Wedding Studio is a desktop application that runs locally on your machine. We do not collect personal data, designs, or telemetry without your consent.</p>
        <p>The download page on this website fetches public release metadata from GitHub. No personal information is transmitted by Wedding Studio itself.</p>
        <p>For questions, contact AetherSolve Pvt Ltd.</p>
      </div>
    </Section>
  ),
});
