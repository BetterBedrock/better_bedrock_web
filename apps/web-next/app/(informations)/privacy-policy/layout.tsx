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
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/24.webp"
    >
      {children}
    </Section>
  );
}
