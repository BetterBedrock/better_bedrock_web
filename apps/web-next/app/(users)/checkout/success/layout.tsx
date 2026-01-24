import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { successPageStyles } from "@/pages/checkout";

interface SuccessLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Checkout Finished Successfully",
};

export default async function SuccessLayout({ children }: SuccessLayoutProps) {
  return (
    <Section
      extraClassName={successPageStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
