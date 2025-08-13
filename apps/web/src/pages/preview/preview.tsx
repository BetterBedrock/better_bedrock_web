import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

interface PreviewProps {
  create?: boolean;
}

export const Preview = ({create}: PreviewProps) => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed center>
      <Hero create={create} />
    </Section>
  </main>
);
