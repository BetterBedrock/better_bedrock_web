import { Section } from "@/_components/section";

import { FAQ } from "@/app/linkvertise/components/faq";
import { Hero } from "@/app/linkvertise/components/hero";
import { Reasons } from "@/app/linkvertise/components/reasons";
import { Tutorial } from "@/app/linkvertise/components/tutorial";

import { styles } from ".";

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
