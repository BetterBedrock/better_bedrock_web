import { HeroHeader, HeroActions } from ".";
import { styles } from ".";

export const Hero = () => (
    <div className={styles.wrapper}>
      <HeroHeader />
      <HeroActions />
    </div>
  );