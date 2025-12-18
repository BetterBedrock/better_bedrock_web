import { Hero } from "./components/hero/hero";
import { guestRedirect } from "./server/guest-redirect";
import { Section } from "@/_components/section";

import styles from "./creator.module.scss";

export default async function Creator() {
  await guestRedirect();

  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
    </Section>
  );
}
