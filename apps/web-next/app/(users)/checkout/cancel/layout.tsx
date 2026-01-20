import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/checkout/cancel";

interface CancelLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Checkout Cancelled",
};

export default async function CancelLayout({ children }: CancelLayoutProps) {
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
