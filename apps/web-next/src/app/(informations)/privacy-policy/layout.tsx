import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./privacy-policy.module.scss";

interface PrivacyPolicyLayoutProps {
  children: ReactNode;
}

export default function PrivacyPolicyLayout({
  children,
}: PrivacyPolicyLayoutProps) {
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
