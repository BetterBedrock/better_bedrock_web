import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import styles from "./login.module.scss";

interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Login Access Your Account",
  description:
    "Log in to your account for fast, secure access to your profile, texture packs, addons, and drafts.",
};

export default async function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
