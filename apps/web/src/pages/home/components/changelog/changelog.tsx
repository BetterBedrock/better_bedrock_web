import { Section } from "~/components/section";
import { ChangelogTrailer } from "./changelog-trailer";
import { styles, ChangelogResources } from ".";

export const Changelog = () => (
  <Section className={styles.background} center>
    <ChangelogTrailer />
    <ChangelogResources />
  </Section>
);
