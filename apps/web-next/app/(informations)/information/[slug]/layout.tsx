import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/information";

interface InformationLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "FAQ – How to Download, Access, and Use Texture Packs",
};

export default function InformationLayout({
  children,
}: InformationLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      src="/images/crosshair_backgrounds/11.webp"
    >
      {children}
    </Section>
  );
}
