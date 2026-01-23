import { Header } from "./header/header";
import { Resolved } from "./resolved/resolved";
import { Unresolved } from "./unresolved/unresolved";

import styles from "./hero-reports.module.scss";

export const HeroReports = () => (
  <div className={styles.hero}>
    <Header />
    <Unresolved />
    <Resolved />
  </div>
);
