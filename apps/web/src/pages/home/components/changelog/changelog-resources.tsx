import { ResourcesTitle, ResourcesDescription } from "./resources";
import { ChangelogActions } from ".";
import { styles } from "~/components/section-divider";

export const ChangelogResources = () => (
  <div className={styles.resources}>
    <ResourcesTitle />
    <ResourcesDescription />
    <ChangelogActions />
  </div>
);
