import { Header } from "./header/header";
import { Statistics } from "./statistics/statistics";
import styles from "./files.module.scss";

export const Files = () => (
  <div className={styles.wrapper}>
    <Header />
    <Statistics />
  </div>
);
