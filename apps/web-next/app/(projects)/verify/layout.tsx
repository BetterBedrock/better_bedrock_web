import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/verify";

interface VerifyLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Download Content Verification",
  description:
    "Verify your session and begin downloading the best Minecraft PE texture packs, scripts, maps, skins, and more from Better Bedrock securely.",
};

export default async function VerifyLayout({ children }: VerifyLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      center
      fixed
      src="/images/crosshair_backgrounds/11.webp"
    >
      {children}
    </Section>
  );
}
