import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./linkvertise.module.scss";

interface LinkvertiseLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Earn Money From Your Texture Packs Step‑by‑Step Linkvertise Guide",
  description:
    "Learn how to monetize your Minecraft texture packs using Linkvertise. This step‑by‑step guide shows you how to set up links, increase downloads, and start earning real revenue from your creations.",
};

export default function LinkvertiseLayout({
  children,
}: LinkvertiseLayoutProps) {
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
