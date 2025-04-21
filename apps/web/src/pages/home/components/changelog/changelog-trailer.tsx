import { TrailerDescription, TrailerTitle, TrailerVideo } from "./trailer";
import { styles } from ".";

export const ChangelogTrailer = () => (
  <div className={styles.trailer}>
    <TrailerTitle />
    <TrailerDescription />
    <TrailerVideo />
  </div>
);
