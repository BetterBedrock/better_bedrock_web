import React from "react";
import { HeaderTitle, HeaderDescription, HeaderAction, styles } from ".";

export const Header = () => (
  <div className={styles.header}>
    <div>
      <HeaderTitle />
      <HeaderDescription />
    </div>
    <HeaderAction />
  </div>
);
