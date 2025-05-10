import { ResourcesTitle, ResourcesDescription } from "./resources";
import { ChangelogActions } from ".";
import { styles } from ".";

export const ChangelogResources = () => (
  <div className={styles.resources}>
    <ResourcesTitle />
    <ResourcesDescription />
    <ChangelogActions />
  </div>
);
