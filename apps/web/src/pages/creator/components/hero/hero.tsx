import { HeroTitle, HeroDescription, HeroActions, styles } from ".";

export const Hero = () => (
  <div className={styles.hero}>
    <HeroTitle />
    <HeroDescription />
    <HeroActions />
  </div>
);
