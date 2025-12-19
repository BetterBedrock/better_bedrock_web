import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./vouchers.module.scss";

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
