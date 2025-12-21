"use server";

import { fetchSubmittedProjects } from "@/features/project/server/fetch-submitted-projects";
import { ProjectsListEmpty } from "./projects-list-empty";

import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";

export const ProjectsList = async () => {
  const projects = await fetchSubmittedProjects();

  if (projects.length === 0) {
    return <ProjectsListEmpty />;
  }

  return <GridDownloadCardList projects={projects} mode="review"/>;
};
