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
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
