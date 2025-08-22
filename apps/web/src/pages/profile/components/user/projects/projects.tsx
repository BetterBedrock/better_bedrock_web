import { useNavigate, useOutletContext } from "react-router-dom";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";

import { styles } from ".";
import { Routes } from "~/utils/routes";
import { useState, useEffect } from "react";
import { SimpleUserDto, SimpleProjectDto } from "~/lib/api";
import { useProject } from "~/providers/project";

export const Projects = () => {
  const navigate = useNavigate();
  const { selectedUser } = useOutletContext<{ selectedUser: SimpleUserDto }>();
  const { fetchUserProjects } = useProject();
  const [projects, setProjects] = useState<SimpleProjectDto[]>([]);

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }
    fetchUserProjects(selectedUser.id).then((data) =>
      setProjects(data?.filter((d) => d.draft === false) ?? []),
    );
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <GridDownloadCard key={index} project={project} mode="view" />
        ))}
      </div>
    </div>
  );
};
