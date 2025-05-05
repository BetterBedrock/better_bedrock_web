import { GridCard } from "~/components/bedrock/grid-card/grid-card";
import { SIDE_PROJECTS_LIST } from "~/pages/downloads/downloads-data";
import { styles } from ".";

export const SideProjectsList = () => (
  <div className={styles.projects}>
    {SIDE_PROJECTS_LIST.map((project) => (
      <GridCard
        useCustomThumbnail={true}
        title={project.title}
        description={project.description}
        customThumbnailImageUrl={project.imageAssetUrl}
        // link={tutorial.link}
      />
    ))}
  </div>
);
