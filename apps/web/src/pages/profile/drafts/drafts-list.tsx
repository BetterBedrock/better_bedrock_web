import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Banner } from "~/components/bedrock/banner";

import { styles, useFetchUserDrafts } from ".";

export const DraftsList = () => {
  const drafts = useFetchUserDrafts();

  if (!drafts) {
    return <CircularProgressIndicator className={styles.loading} size="medium" />;
  }

  if (drafts.length < 1) {
    return <Banner type="neutral" message="No draft projects available" />;
  }

  return (
    <div className={styles.projects}>
      {drafts.map((project) => (
        <GridDownloadCard
          key={project.id}
          project={project}
          mode="edit"
          tags={project.submitted ? ["Submitted"] : []}
        />
      ))}
    </div>
  );
};
