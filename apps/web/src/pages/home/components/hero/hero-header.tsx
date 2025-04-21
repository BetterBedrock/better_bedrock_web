import { HeroDescription, HeroActions, HeroTitle } from "./header";
import { styles } from ".";

export const HeroHeader = () => (
  <div className={styles.header}>
    <HeroTitle />
    <HeroDescription />
    <HeroActions />
  </div>
);