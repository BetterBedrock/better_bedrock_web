"use client";

import { Card } from "@/shared/ui/card";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectCardPreviewActions } from "./project-card-preview-actions";

import { useProjectManager } from "@/app/providers/project-manager";

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
          <GridDownloadCard project={{ ...selectedProject }} />
        )}
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <ProjectCardPreviewActions />
      </Card.Body>
    </Card>
  );
};
