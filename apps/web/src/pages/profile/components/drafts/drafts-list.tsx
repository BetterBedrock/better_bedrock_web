import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { styles } from ".";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";
import { Banner } from "~/components/bedrock/banner";

export const DraftsList = () => {
  const navigate = useNavigate();

  const { selectedUser, drafts, setDrafts } =
    useUserProfile();
  const { fetchUserProjects } = useProject();

  const [fetchedUserId, setFetchedUserId] = useState(() => {
    if (selectedUser && drafts && drafts.length > 0) {
      return selectedUser.id;
    }
    return null;
  });

  const fetchDrafts = async (id: string) => {
    const data = await fetchUserProjects(id);
    const published = data?.filter((d) => d.draft === false).map((d) => d.id) ?? [];
    setDrafts(
      (data?.filter((d) => d.draft === true && !published.includes(d.id)) ?? []).sort((a, b) =>
        dayjs(a.lastChanged).isBefore(b.lastChanged) ? 1 : -1,
      ),
    );
    setFetchedUserId(id);
  };

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }

    if (selectedUser.id !== fetchedUserId) {
      fetchDrafts(selectedUser.id);
    }
  }, [selectedUser]);

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
        )
      )}
    </div>
  );
};
