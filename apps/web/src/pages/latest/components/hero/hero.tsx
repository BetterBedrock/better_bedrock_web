import { HeroTitle, HeroDescription, HeroAction, HeroModMenu, styles } from ".";

export const Hero = () => (
  <div className={styles.wrapper}>
    <HeroAction />
    <HeroModMenu />
    <HeroTitle />
    <HeroDescription />
  </div>
);
