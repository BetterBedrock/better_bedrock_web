"use server";

import { ProjectsListEmpty } from "./projects-list-empty";

import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { Card } from "@/shared/ui/card";
import { fetchSubmittedProjects } from "@/entities/project";

export const ProjectsList = async () => {
  const projects = await fetchSubmittedProjects();

  return (
    <Card fullWidth>
      <Card.Body>
        {projects.length === 0 ? (
          <ProjectsListEmpty />
        ) : (
          <GridDownloadCardList projects={projects} mode="review" />
        )}
      </Card.Body>
    </Card>
  );
};
