import { HeaderTitle, HeaderDescription, styles } from ".";

export const Header = () => (
  <div className={styles.header}>
    <div>
      <HeaderTitle />
      <HeaderDescription />
    </div>
  </div>
);
