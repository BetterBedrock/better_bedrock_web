import { SimpleProjectDto } from "@/_lib/api";
import { DownloadsItemDto } from "@/public/content/dto/downloads-item.dto";
import { DownloadsListDto } from "@/public/content/dto/downloads-list.dto";
import { SIDE_PROJECTS_LIST } from "@/public/content/better-bedrock";

import { fetchProjectsBasicInfo } from "@/_lib/projects";

import { Heading } from "@/app/downloads/components/heading/heading";
import { SideProjectsBanner } from "./side-projects-banner";
import { SideProjectsList } from "./side-projects-list";

import styles from "./side-projects.module.scss";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const revalidate = 300;

export default async function SideProjects() {
  const projects = await fetchProjectsBasicInfo(SIDE_PROJECTS_LIST);

  if (projects.length < 1) {
    return <SideProjectsBanner />;
  }

  return (
    <div className={styles.category}>
      <Heading
        title="Side Projects"
        description="Enjoy playing Minecraft on a whole new level using latest version of the main texture pack!"
      />
      <SideProjectsList projects={projects} />
    </div>
  );
}
