"use client";

import { Card } from "@/shared/ui/card";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectCardPreviewActions } from "./project-card-preview-actions";

import { useProjectManager } from "@/app/providers/project-manager";
import { pick } from "lodash";

export const ProjectCardPreview = () => {
  const { selectedProject } = useProjectManager();

  return (
    <Card>
      <Card.Body>
        <ProjectHeaderTitle title="Review" />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        {selectedProject && (
          <GridDownloadCard
            {...pick(
              selectedProject,
              "id",
              "title",
              "submitted",
              "lastChanged",
              "thumbnail",
              "type",
              "betterBedrockContent",
              "tags",
            )}
            userName={selectedProject.user.name}
            tags={selectedProject.tags.map((tag) => tag.name)}
            averageRating={selectedProject.rating.average}
          />
        )}
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <ProjectCardPreviewActions />
      </Card.Body>
    </Card>
  );
};
