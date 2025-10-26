import { ResourcesTitle, ResourcesDescription } from "./resources";
import { ChangelogActions, styles } from ".";

export const ChangelogResources = () => (
  <div className={styles.resources}>
    <ResourcesTitle />
    <ResourcesDescription />
    <ChangelogActions />
  </div>
);
