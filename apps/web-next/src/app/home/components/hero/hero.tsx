import { Section } from "@/app/_components/section";
import { HeroHeader, HeroTrailer, styles } from ".";

export const Hero = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <HeroHeader />
    <HeroTrailer />
  </Section>
);
