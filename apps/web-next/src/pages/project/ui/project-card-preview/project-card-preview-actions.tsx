import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectCardPreviewActionsDecline } from "@/pages/project/ui/project-card-preview/project-card-preview-actions-decline";
import { ProjectCardPreviewActionsPublish } from "@/pages/project/ui/project-card-preview/project-card-preview-actions-publish";

import styles from "./project-card-preview.module.scss";

export const ProjectCardPreviewActions = () => (
  <div className={styles.editor}>
    <ButtonGroup>
      <ProjectCardPreviewActionsPublish />
      <ProjectCardPreviewActionsDecline />
    </ButtonGroup>
  </div>
);
