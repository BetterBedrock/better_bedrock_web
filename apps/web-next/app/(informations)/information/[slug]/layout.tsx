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
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      {children}
    </Section>
  );
}
