import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";
import type { Metadata } from "next";

import { styles } from "@/pages/downloads";

interface DownloadsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title:
    "Minecraft Bedrock Mods, Texture Packs, Maps, Skins & More | Better Bedrock",
};

export default function DownloadsLayout({ children }: DownloadsLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      src="/images/crosshair_backgrounds/16.webp"
    >
      {children}
    </Section>
  );
}
