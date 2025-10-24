import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useRedirectToDiscord } from "~/pages/discord/hooks";

export const Discord = () => {
  useRedirectToDiscord();

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
      </Section>
    </main>
  );
};
