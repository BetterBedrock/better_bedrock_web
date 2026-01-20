"use client";

import { Card, CardDivider } from "@/shared/ui/card";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { useProjectManager } from "@/shared/model/project-manager";
import { ProjectHeaderTitle } from "@/widgets/project-header/ui/project-header-title";
import { ProjectCardPreviewActions } from "@/widgets/project-card-preview/ui/project-card-preview-actions";

import styles from "./project-card-preview.module.scss";

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
