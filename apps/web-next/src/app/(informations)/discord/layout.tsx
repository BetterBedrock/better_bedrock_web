import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./discord.module.scss";

interface DiscordLayoutProps {
  children: ReactNode;
}

export default async function DiscordLayout({ children }: DiscordLayoutProps) {
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
