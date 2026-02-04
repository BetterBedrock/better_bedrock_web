import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/terms";

interface TermsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Better Bedrock, outlining the rules and guidelines for using our platform to access Minecraft PE texture packs, scripts, maps, skins, and more.",
};

export default function TermsLayout({ children }: TermsLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/24.webp"
    >
      {children}
    </Section>
  );
}
