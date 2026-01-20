import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/discord";

interface DiscordLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Official Discord",
};

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
