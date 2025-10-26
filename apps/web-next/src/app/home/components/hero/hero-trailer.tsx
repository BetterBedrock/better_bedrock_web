import { TrailerDescription, TrailerTitle, TrailerVideo } from "./trailer";
import { styles } from ".";

export const HeroTrailer = () => (
  <div className={styles.trailer}>
    <TrailerTitle />
    <TrailerDescription />
    <TrailerVideo />
  </div>
);
