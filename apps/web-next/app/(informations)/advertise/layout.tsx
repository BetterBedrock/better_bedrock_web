import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/advertise";

interface AdvertiseLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Advertise",
};

export default function AdvertiseLayout({ children }: AdvertiseLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/20.webp"
    >
      {children}
    </Section>
  );
}
