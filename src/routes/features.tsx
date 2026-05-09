import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { FeatureGrid } from "@/components/site/FeatureGrid";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Wedding Studio" },
      { name: "description", content: "All features in Wedding Studio: multi-canvas, Devanagari typography, QR generation, layers, exports, blueprint mode and more." },
      { property: "og:title", content: "Features — Wedding Studio" },
      { property: "og:description", content: "Everything Wedding Studio offers for professional print studios." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <Section
      eyebrow="Capabilities"
      title="Every feature, in one place."
      description="A focused, fast desktop application built around the realities of print production for wedding studios."
    >
      <FeatureGrid />
    </Section>
  );
}
