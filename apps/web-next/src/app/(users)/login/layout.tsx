import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./login.module.scss";

interface LoginLayoutProps {
  children: ReactNode;
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
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
