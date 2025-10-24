import { Heading } from "~/pages/downloads/components/heading";
import { SimpleProjectDto } from "~/lib/api";
import { DownloadsListDto } from "~/assets/content/dto/downloads-list.dto";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

import { SideProjectsBanner, SideProjectsList, styles, useFetchSideProjects } from ".";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const SideProjects = () => {
  const projects = useFetchSideProjects();

  if (!projects) {
    return <CircularProgressIndicator size="medium" />;
  }

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
};
