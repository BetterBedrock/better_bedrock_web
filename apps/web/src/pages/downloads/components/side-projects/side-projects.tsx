import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useContent } from "~/providers/content";
import { SideProjectsActions, SideProjectsList } from ".";

import { styles } from ".";
import { Heading } from "~/pages/downloads/components/heading";

export const SideProjects = () => {
  const { downloads, fetched } = useContent();

  if (!fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  const sideProjectsDownloads = downloads!.sideProjects;

  return sideProjectsDownloads.map((category, index) => (
    <div key={index} className={styles.category}>
      <Heading title={category.title} description={category.description} />

      <SideProjectsActions buttons={category.buttons!} />
      <SideProjectsList items={category.items} />
    </div>
  ));
};
