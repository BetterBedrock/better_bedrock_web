import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./terms.module.scss";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Better Bedrock, outlining the rules and guidelines for using our platform to access Minecraft PE texture packs, scripts, maps, skins, and more.",
};

export default function Terms() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
    </Section>
  );
}
