import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/checkout/success";

interface SuccessLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Checkout Finished Successfully",
};

export default async function SuccessLayout({ children }: SuccessLayoutProps) {
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
