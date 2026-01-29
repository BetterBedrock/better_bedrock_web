import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/monetization";

interface MonetizationLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Earn Money From Your Texture Packs Step‑by‑Step Monetization Guide",
  description:
    "Learn how to monetize your Minecraft texture packs using monetization providers. This step‑by‑step guide shows you how to set up links, increase downloads, and start earning real revenue from your creations.",
};

export default function MonetizationLayout({
  children,
}: MonetizationLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/22.webp"
    >
      {children}
    </Section>
  );
}
