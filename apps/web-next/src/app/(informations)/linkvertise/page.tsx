import { Section } from "@/components/section";

import { FAQ } from "./components/faq/faq";
import { Hero } from "./components/hero/hero";
import { Reasons } from "./components/reasons/reasons";
import { Tutorial } from "./components/tutorial/tutorial";

import styles from "./linkvertise.module.scss";

export default function Linkvertise() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
      <Reasons />
      <FAQ />
      <Tutorial />
    </Section>
  );
}
