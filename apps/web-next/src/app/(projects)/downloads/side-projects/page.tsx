import { SimpleProjectDto } from "@/lib/api";
import { DownloadsItemDto } from "@/public/content/dto/downloads-item.dto";
import { DownloadsListDto } from "@/public/content/dto/downloads-list.dto";
import { SIDE_PROJECTS_LIST } from "@/public/content/better-bedrock";

import { fetchProjectsBasicInfo } from "@/features/project/server";

import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { SideProjectsHeading } from "@/features/project/components/side-projects/side-projects-heading";
import { SideProjectsBanner } from "@/features/project/components/side-projects/side-projects-banner";

import styles from "./side-projects.module.scss";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const revalidate = 300;

export default async function SideProjects() {
  const projects = await fetchProjectsBasicInfo(SIDE_PROJECTS_LIST);

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
