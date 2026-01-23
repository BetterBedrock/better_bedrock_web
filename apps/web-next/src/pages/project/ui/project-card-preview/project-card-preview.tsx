"use client";

import { Card, CardDivider } from "@/shared/ui/card";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectCardPreviewActions } from "./project-card-preview-actions";

import styles from "./project-card-preview.module.scss";
import { useProjectManager } from "@/app/providers/project-manager";

export const ProjectCardPreview = () => {
  const { selectedProject } = useProjectManager();

  return (
    <Card sub>
      <div className={styles.editor}>
        <ProjectHeaderTitle title="Review" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        {selectedProject && (
          <GridDownloadCard project={{ ...selectedProject }} />
        )}
      </div>
      <CardDivider sub />
      <ProjectCardPreviewActions />
    </Card>
  );
};
