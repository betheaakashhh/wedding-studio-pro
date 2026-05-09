import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Wedding Studio" }, { name: "description", content: "Terms of use for Wedding Studio." }] }),
  component: () => (
    <Section eyebrow="Legal" title="Terms of Use">
      <div className="prose prose-invert max-w-3xl prose-p:text-muted-foreground">
        <p>Wedding Studio is provided by AetherSolve Pvt Ltd. By downloading and using the software you agree to use it lawfully and in accordance with the included license.</p>
        <p>Wedding Studio is provided "as is" without warranty of any kind. AetherSolve is not liable for any damages arising from use of the software.</p>
      </div>
    </Section>
  ),
});
