import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { ProjectActionsDelete } from "@/widgets/project-actions/ui/project-actions-delete";
import { ProjectActionsSave } from "@/widgets/project-actions/ui/project-actions-save";
import { ProjectActionsSubmission } from "@/widgets/project-actions/ui/project-actions-submission";

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
