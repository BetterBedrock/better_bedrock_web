import { ButtonGroup } from "@/components/button-group/button-group";
import { DetailedProjectDto } from "@/lib/api";
import { ActionsDelete } from "@/features/project/components/actions/actions-delete";
import { ActionsSave } from "@/features/project/components/actions/actions-save";
import { ActionsSubmission } from "@/features/project/components/actions/actions-submission";

interface ActionsProps {
  detailedProject: DetailedProjectDto;
}

export const Actions = ({ detailedProject }: ActionsProps) => (
  <ButtonGroup>
    {!detailedProject.submitted && <ActionsSave />}
    <ActionsSubmission />
    <ActionsDelete />
  </ButtonGroup>
);
