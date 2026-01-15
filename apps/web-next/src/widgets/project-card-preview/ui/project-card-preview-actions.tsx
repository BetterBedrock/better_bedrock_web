import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { ProjectCardPreviewActionsDecline } from "@/widgets/project-card-preview/ui/project-card-preview-actions-decline";
import { ProjectCardPreviewActionsPublish } from "@/widgets/project-card-preview/ui/project-card-preview-actions-publish";

import styles from "./project-card-preview.module.scss";

export const ProjectCardPreviewActions = () => (
  <div className={styles.editor}>
    <ButtonGroup>
      <ProjectCardPreviewActionsPublish />
      <ProjectCardPreviewActionsDecline />
    </ButtonGroup>
  </div>
);
