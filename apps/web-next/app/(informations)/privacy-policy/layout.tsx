import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/privacy-policy";

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
