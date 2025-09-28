import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { styles } from ".";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";
import { Banner } from "~/components/bedrock/banner";

export const ProjectsList = () => {
  const navigate = useNavigate();
  const { selectedUser, projects, setProjects } = useUserProfile();
  const { fetchUserProjects } = useProject();

  const [fetchedUserId, setFetchedUserId] = useState(() => {
    if (selectedUser && projects && projects.length > 0) {
      return selectedUser.id;
    }
    return null;
  });

  const fetchProjects = async (id: string) => {
    const data = await fetchUserProjects(id);
    setProjects(data?.filter((d) => d.draft === false) ?? []);
    setFetchedUserId(id);
  };

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }

    if (selectedUser.id !== fetchedUserId) {
      fetchProjects(selectedUser.id);
    }
  }, [selectedUser]);

  if (!projects) {
    return <CircularProgressIndicator className={styles.loading} size="medium" />;
  }

  if (projects.length < 1) {
    return <Banner type="neutral" message="No public projects available" />;
  }

  return (
    <div className={styles.projects}>
      {projects.map((project, index) => (
        <GridDownloadCard key={index} project={project} mode="view" />
      ))}
    </div>
  );
};