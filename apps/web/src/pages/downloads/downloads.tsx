import { Outlet } from "react-router-dom";
import styles from "./downloads.module.scss";

import { Section } from "~/components/section";

export const Downloads = () => (
  <main>
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      <Outlet />
    </Section>
  </main>
);
