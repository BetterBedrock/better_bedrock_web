import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useGuestRedirect } from "~/pages/creator/hooks";

export const Editor = () => {
  useGuestRedirect();

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
      </Section>
    </main>
  );
};
