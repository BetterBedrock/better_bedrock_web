import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/create";

interface CreatorLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Publish Your Texture Pack",
};

export default function CreatorLayout({ children }: CreatorLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
