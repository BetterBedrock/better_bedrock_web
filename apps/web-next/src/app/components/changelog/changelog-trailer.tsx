import { TrailerDescription } from "./trailer/trailer-description";
import { TrailerTitle } from "./trailer/trailer-title";
import { TrailerVideo } from "./trailer/trailer-video";
import styles from "./changelog.module.scss";

export const ChangelogTrailer = () => (
  <div className={styles.trailer}>
    <TrailerTitle />
    <TrailerDescription />
    <TrailerVideo />
  </div>
);
