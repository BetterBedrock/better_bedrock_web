import {
  SideProjectsActions,
  SideProjectsHeading,
  SideProjectsList,
} from ".";

import { styles } from ".";

export const SideProjects = () => (
  <div className={styles.category}>
    <SideProjectsHeading />
    <SideProjectsActions />
    <SideProjectsList />
  </div>
);
