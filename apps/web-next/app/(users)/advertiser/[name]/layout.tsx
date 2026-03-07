import { ReactNode } from "react";
import { Section } from "@/shared/ui/section";
import { advertiserLayoutStyles } from "@/pages/advertiser";

interface AdvertiserLayoutProps {
    children: ReactNode;
}

export default async function AdvertiserLayout({ children }: AdvertiserLayoutProps) {
  return (
    <Section
      extraClassName={advertiserLayoutStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}