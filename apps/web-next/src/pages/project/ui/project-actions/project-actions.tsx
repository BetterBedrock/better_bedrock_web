import { ButtonGroup } from "@/shared/ui/button-group";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { ProjectActionsDelete } from "@/pages/project/ui/project-actions/project-actions-delete";
import { ProjectActionsSave } from "@/pages/project/ui/project-actions/project-actions-save";
import { ProjectActionsSubmission } from "@/pages/project/ui/project-actions/project-actions-submission";

interface ProjectActionsProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectActions = ({ detailedProject }: ProjectActionsProps) => (
  <ButtonGroup>
    {!detailedProject.submitted && <ProjectActionsSave />}
    <ProjectActionsSubmission />
    <ProjectActionsDelete />
  </ButtonGroup>
);
