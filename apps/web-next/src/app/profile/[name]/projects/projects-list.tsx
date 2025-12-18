import { GridDownloadCard } from "@/_components/grid-download-card";

import { fetchUserProjects } from "@/_lib/projects/fetch-user-projects";
import { fetchUserByName } from "@/_lib/user";
import { notFound } from "next/navigation";
import { ProjectsListEmpty } from "./projects-list-empty";

import styles from "./projects.module.scss";

interface ProjectsListProps {
  params: { name: string };
}

export const revalidate = 60;

export const ProjectsList = async ({ params }: ProjectsListProps) => {
  const user = await fetchUserByName(params.name);
  if (!user) {
    notFound();
  }

  const projects = await fetchUserProjects(user.id);

  if (projects.length < 1) {
    return <ProjectsListEmpty />;
  }

  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <GridDownloadCard key={project.id} project={project} mode="view" />
      ))}
    </div>
  );
};
