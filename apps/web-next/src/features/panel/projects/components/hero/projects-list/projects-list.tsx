"use server";

import { fetchSubmittedProjects } from "@/features/project/server/fetch-submitted-projects";
import { ProjectsListEmpty } from "./projects-list-empty";

import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { Card, CardBody } from "@/components/card/card";

export const ProjectsList = async () => {
  const projects = await fetchSubmittedProjects();

  return (
    <Card fullWidth>
      <CardBody>
        {(projects.length === 0) ? <ProjectsListEmpty /> : <GridDownloadCardList projects={projects} mode="review" />}
      </CardBody>
    </Card>
  );
};
