import { Banner } from "@/_components/banner";
import { GridDownloadCard } from "@/_components/grid-download-card";
import { fetchUserDrafts } from "@/_lib/projects/fetch-user-drafts";

import { styles } from ".";
import { fetchUserByName } from "@/_lib/user";
import { notFound } from "next/navigation";

interface DraftsListProps {
  name: string;
}

export const revalidate = 20;

export const DraftsList = async ({ name }: DraftsListProps) => {
  const user = await fetchUserByName(name);
  if(!user) {
    notFound();
  }
  
  const drafts = await fetchUserDrafts(user.id);

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
