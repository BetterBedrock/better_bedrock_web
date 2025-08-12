import { Section } from "~/components/section";
import { styles } from ".";
import { Hero } from "./components/hero";
import { Input } from "~/components/bedrock/input";

export const Config = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed center>
      <Input placeholder="Config Name"/>
      <Hero />
    </Section>
  </main>
);
