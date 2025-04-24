import {
  SideProjectsActions,
  SideProjectsHeading,
  SideProjectsList,
} from "./side-projects";

import { styles } from ".";

export const DownloadsSideProjects = () => (
  <div className={styles.category}>
    <SideProjectsHeading />
    <SideProjectsActions />
    <SideProjectsList />
  </div>
);
