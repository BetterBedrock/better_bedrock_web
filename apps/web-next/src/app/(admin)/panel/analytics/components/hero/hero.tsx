import { Header } from "./header/header";
import { Statistics } from "./statistics/statistics";

import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.wrapper}>
    <Header />
    <Statistics />
  </div>
);
