import { Section } from "~/components/section";
import { HeroHeader, HeroTrailer, styles } from ".";

export const Hero = () => (
  <Section className={styles.background}>
    <HeroHeader />
    <HeroTrailer />
    {/* <HeroBottomText /> */}
  </Section>
);
