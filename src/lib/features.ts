import {
  Layers, Type, QrCode, Image as ImageIcon, FileOutput, Ruler,
  Palette, Languages, Wifi, FileText, Sparkles, Grid3x3, Boxes, Crop,
} from "lucide-react";

export const FEATURES = [
  { icon: Layers, title: "Multi-canvas workflow", desc: "Design front, back, inserts, and envelope side-by-side. Switch contexts without losing focus." },
  { icon: Languages, title: "Hindi & Devanagari", desc: "First-class Unicode and Devanagari rendering with proper kerning, conjuncts and ligatures." },
  { icon: Type, title: "Advanced typography", desc: "OpenType features, variable fonts, optical sizing, baseline grid and paragraph styles." },
  { icon: QrCode, title: "QR generation", desc: "Generate RSVP, location and gallery QR codes with custom error correction and styling." },
  { icon: Boxes, title: "Powerful layer system", desc: "Smart groups, masks, blend modes, and non-destructive transforms." },
  { icon: ImageIcon, title: "Graphic library", desc: "Curated motifs, borders and decorative elements built for Indian wedding aesthetics." },
  { icon: FileOutput, title: "Print-ready export", desc: "PDF/X-1a, CMYK separations, embedded ICC profiles and crop marks ready for press." },
  { icon: Grid3x3, title: "Blueprint mode", desc: "Inspect spacing, structure and alignment of any document with one keystroke." },
  { icon: Crop, title: "Bleed & background", desc: "Configurable bleed, slug, and background fills with safe-area indicators." },
  { icon: FileText, title: "Font manager", desc: "Activate, organize and preview custom fonts per project — no system installs needed." },
  { icon: Ruler, title: "Smart alignment", desc: "Distribute, snap and align with sub-pixel precision and contextual guides." },
  { icon: Palette, title: "Print-ready layouts", desc: "300 DPI canvases, paper-size presets, panel folding and imposition support." },
  { icon: Wifi, title: "Fully offline", desc: "Native desktop performance — your work stays local, your studio stays productive." },
  { icon: Sparkles, title: "Templates & presets", desc: "Start from professionally crafted templates and save your studio's signature presets." },
];
