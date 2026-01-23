import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { cancelPageStyles } from "@/pages/checkout";

interface CancelLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Checkout Cancelled",
};

export default async function CancelLayout({ children }: CancelLayoutProps) {
  return (
    <Section
      className={cancelPageStyles.background}
      extraClassName={cancelPageStyles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
