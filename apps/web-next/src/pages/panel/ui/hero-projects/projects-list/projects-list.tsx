"use server";

import { ProjectsListEmpty } from "./projects-list-empty";

import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { Card, CardBody } from "@/shared/ui/card";
import { fetchSubmittedProjects } from "@/entities/project";

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
