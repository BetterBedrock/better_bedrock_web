import { ChangelogTrailer } from "./changelog-trailer";
import { styles, ChangelogResources } from ".";
import { Section } from "@/_components/section";

export const Changelog = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <ChangelogTrailer />
    <ChangelogResources />
  </Section>
);
