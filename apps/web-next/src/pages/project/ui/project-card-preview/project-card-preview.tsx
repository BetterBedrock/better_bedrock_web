"use client";

import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectCardPreviewActions } from "./project-card-preview-actions";

import styles from "./project-card-preview.module.scss";
import { useProjectManager } from "@/app/providers/project-manager";

export const ProjectCardPreview = () => {
  const { selectedProject } = useProjectManager();

  return (
    <Card>
      <CardBody>
        <ProjectHeaderTitle title="Review" />
      </CardBody>
      <CardDivider />
      <CardBody>
        {selectedProject && (
          <GridDownloadCard project={{ ...selectedProject }} />
        )}
      </CardBody>
      <CardDivider />
      <CardBody>
        <ProjectCardPreviewActions />
      </CardBody>
    </Card>
  );
};
