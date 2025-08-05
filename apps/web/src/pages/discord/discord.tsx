import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useEffect } from "react";

export const Discord = () => {
  useEffect(() => {
    window.location.href = "https://discord.gg/ZGK5WYXnEY";
  }, []);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
      </Section>
    </main>
  );
};
