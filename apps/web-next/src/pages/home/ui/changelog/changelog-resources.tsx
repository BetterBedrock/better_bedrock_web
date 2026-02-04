import { ChangelogActions } from "./changelog-actions";
import { ResourcesDescription } from "./resources/resources-description";
import { ResourcesTitle } from "./resources/resources-title";

import styles from "./changelog.module.scss";

export const ChangelogResources = () => (
  <div className={styles.resources}>
    <ResourcesTitle />
    <ResourcesDescription />
    <ChangelogActions />
  </div>
);
