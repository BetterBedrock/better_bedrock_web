import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { SideProjectsHeading } from "@/features/project/components/side-projects/side-projects-heading";
import { SideProjectsBanner } from "@/features/project/components/side-projects/side-projects-banner";
import { loadDownloadsSideProjectsPageData } from "@/features/project/server/load-downloads-side-projects-page-data";

import styles from "./side-projects.module.scss";

export const revalidate = 300;

export default async function SideProjects() {
  const projects = await loadDownloadsSideProjectsPageData();

  if (projects.length < 1) {
    return <SideProjectsBanner />
  }

  return (
    <div className={styles.category}>
      <SideProjectsHeading />
      <GridDownloadCardList projects={projects} />
    </div>
  );
}
