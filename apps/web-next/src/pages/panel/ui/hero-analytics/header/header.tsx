import { HeaderTitle } from "./header-title";
import { HeaderDescription } from "./header-description";
import styles from "./header.module.scss";

export const Header = () => (
  <div className={styles.header}>
    <div>
      <HeaderTitle />
      <HeaderDescription />
    </div>
  </div>
);
