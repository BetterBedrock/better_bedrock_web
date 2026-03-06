import { ChangelogResources } from "./changelog-resources";
import { ChangelogTrailer } from "./changelog-trailer";
import { Section } from "@/shared/ui/section";

import styles from "./changelog.module.scss";

export const Changelog = () => (
  <Section
    className={styles.background}
    extraClassName={styles.padding}
    center
    dark
    gradientBackground={false}
    src="/images/crosshair_backgrounds/12.webp"
  >
    <ChangelogTrailer />
    <ChangelogResources />
  </Section>
);
