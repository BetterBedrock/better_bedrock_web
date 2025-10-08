import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Banner } from "~/components/bedrock/banner";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { styles } from ".";
import { SimpleProjectDto } from "~/lib/api";
import { useProject } from "~/providers/project";

export const ProjectsList = () => {
  const { submittedProjects } = useProject();
  const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>();

  const fetchProjects = async () => {
    const fetchedProjects = await submittedProjects();
    setProjects(fetchedProjects ?? []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const calculateHours = (project: SimpleProjectDto) => {
    return dayjs().diff(dayjs(project.lastChanged), "hour");
  };

  if (!projects) {
    return <CircularProgressIndicator center />;
  }

  if (projects.length === 0) {
    return <Banner message="There are no submitted projects at the moment" type="neutral" />;
  }

  return (
    <div className={styles.list}>
      {projects.map((project, index) => (
        <GridDownloadCard
          key={index}
          project={project}
          mode="review"
          tags={[`${calculateHours(project)}h ago`]}
        />
      ))}
    </div>
  );
};
