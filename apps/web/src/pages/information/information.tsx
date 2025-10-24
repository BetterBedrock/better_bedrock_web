import { Section } from "~/components/section";
import { Outlet } from "react-router-dom";

import { styles, useVerifyExistingInfo } from ".";

export const Information = () => {
  useVerifyExistingInfo();

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed>
        <Outlet />
      </Section>
    </main>
  );
};
