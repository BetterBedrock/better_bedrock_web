import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { vouchersPageStyles } from "@/pages/panel";

interface VouchersLayoutProps {
  children: ReactNode;
}

export default function VouchersLayout({ children }: VouchersLayoutProps) {
  return (
    <Section
      className={vouchersPageStyles.background}
      extraClassName={vouchersPageStyles.padding}
      fixed
    >
      {children}
    </Section>
  );
}
