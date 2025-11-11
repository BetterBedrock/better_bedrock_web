import { HeroAction, HeroDescription, HeroTitle, styles } from ".";

export const Hero = () => (
  <div>
    <div className={styles.header}>
      <HeroTitle />
      <HeroDescription />
    </div>
    <HeroAction />
  </div>
);
