import { ChangelogResources } from "./changelog-resources";
import { ChangelogTrailer } from "./changelog-trailer";
import { Section } from "@/_components/section";

import styles from "./changelog.module.scss";

export const Changelog = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <ChangelogTrailer />
    <ChangelogResources />
  </Section>
);
