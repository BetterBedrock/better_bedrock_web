"use server";

import { fetchSubmittedProjects } from "@/entities/project/api/fetch-submitted-projects";
import { ProjectsListEmpty } from "./projects-list-empty";

import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list/grid-download-card-list";
import { Card, CardBody } from "@/shared/ui/card/card";

export const ProjectsList = async () => {
  const projects = await fetchSubmittedProjects();

  return (
    <Card fullWidth>
      <CardBody>
        {projects.length === 0 ? (
          <ProjectsListEmpty />
        ) : (
          <GridDownloadCardList projects={projects} mode="review" />
        )}
      </CardBody>
    </Card>
  );
};
