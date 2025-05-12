import { HeroHeader, HeroInput, HeroActions } from ".";
import {styles} from "."

export const Hero = () => (
  <div className={styles.wrapper}>
    <HeroHeader />
    <HeroInput />
    <HeroActions />
  </div>
);
