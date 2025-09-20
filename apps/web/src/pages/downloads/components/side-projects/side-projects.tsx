import { useEffect, useRef, useState } from "react";
import { styles } from ".";
import { Heading } from "~/pages/downloads/components/heading";
import { SIDE_PROJECTS_LIST } from "~/assets/content/better-bedrock";
import { useProject } from "~/providers/project";
import { SimpleProjectDto } from "~/lib/api";
import { DownloadsListDto } from "~/assets/content/dto/downloads-list.dto";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";
import { Banner } from "~/components/bedrock/banner";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const SideProjects = () => {
  const { fetchProjectsBasicInfo } = useProject();

  const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setProjects(await fetchProjectsBasicInfo(SIDE_PROJECTS_LIST));
  };

  if (!projects) {
    return <CircularProgressIndicator size="medium" />;
  }

  if (projects.length < 1) {
    return (
      <>
        <Banner
          type="info"
          message="Better Bedrock content is not yet prepared, please wait a while and refresh this site."
        />
        <CircularProgressIndicator size="medium" />
      </>
    );
  }

  return (
    <div className={styles.category}>
      <Heading
        title="Side Projects"
        description="Enjoy playing Minecraft on a whole new level using latest version of the main texture pack!"
      />
      <div className={styles.grid}>
        {projects.map((project) => (
          <GridDownloadCard project={project} mode="view" />
        ))}
      </div>
    </div>
  );
};
