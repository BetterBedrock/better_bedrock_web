import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectCardPreviewActionsDecline } from "@/pages/project/ui/project-card-preview/project-card-preview-actions-decline";
import { ProjectCardPreviewActionsPublish } from "@/pages/project/ui/project-card-preview/project-card-preview-actions-publish";

export const ProjectCardPreviewActions = () => (
  <ButtonGroup>
    <ProjectCardPreviewActionsPublish />
    <ProjectCardPreviewActionsDecline />
  </ButtonGroup>
);
