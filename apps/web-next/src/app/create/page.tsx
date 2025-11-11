import { Hero } from "./components/hero";
import { guestRedirect } from "@/app/create/server";
import { Section } from "@/_components/section";

import { styles } from ".";

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
