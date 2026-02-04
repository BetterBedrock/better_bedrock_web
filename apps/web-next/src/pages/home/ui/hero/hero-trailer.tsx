import { TrailerDescription } from "./trailer/trailer-description";
import { TrailerTitle } from "./trailer/trailer-title";
import { TrailerVideo } from "./trailer/trailer-video";
import styles from "./hero.module.scss";

export const HeroTrailer = () => (
  <div className={styles.trailer}>
    <TrailerTitle />
    <TrailerDescription />
    <TrailerVideo />
  </div>
);
