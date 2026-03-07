import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { adsPageStyles } from "@/pages/panel";

interface AdsLayoutProps {
  children: ReactNode;
}

export default function AdsLayout({ children }: AdsLayoutProps) {
  return (
    <Section
      extraClassName={adsPageStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
