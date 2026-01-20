import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/panel/vouchers";

interface VouchersLayoutProps {
  children: ReactNode;
}

export default function VouchersLayout({ children }: VouchersLayoutProps) {
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
