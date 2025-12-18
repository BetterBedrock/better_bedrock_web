import { Header } from "./header/header";
import { Resolved } from "./resolved/resolved";
import { Unresolved } from "./unresolved/unresolved";

import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <Unresolved />
    <Resolved />
  </div>
);
