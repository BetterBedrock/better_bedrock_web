import { ReasonsDescription } from "./reasons-description";
import { ReasonsTitle } from "./reasons-title";
import styles from "./reasons.module.scss";

export const ReasonsHeading = () => (
  <div className={styles.cardTextWrapper}>
    <ReasonsTitle />
    <ReasonsDescription />
  </div>
);
