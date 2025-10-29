import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { Reasons } from "~/pages/linkvertise/components/reasons";
import { FAQ } from "~/pages/linkvertise/components/faq";
import { Tutorial } from "~/pages/linkvertise/components/tutorial";

export const Linkvertise = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed center>
      <Hero />
      <Reasons />
      <FAQ />
      <Tutorial />
    </Section>
  </main>
);
