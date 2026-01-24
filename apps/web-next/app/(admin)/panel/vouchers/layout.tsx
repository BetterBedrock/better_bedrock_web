import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { vouchersPageStyles } from "@/pages/panel";

interface VouchersLayoutProps {
  children: ReactNode;
}

export default function VouchersLayout({ children }: VouchersLayoutProps) {
  return (
    <Section
      extraClassName={vouchersPageStyles.padding}
      fixed
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
