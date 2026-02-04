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
      extraClassName={cancelPageStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
