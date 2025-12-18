import { ButtonGroup } from "@/_components/button-group/button-group";
import { DetailedProjectDto } from "@/_lib/api";
import { ActionsDelete } from "@/app/project/components/actions/actions-delete";
import { ActionsSave } from "@/app/project/components/actions/actions-save";
import { ActionsSubmission } from "@/app/project/components/actions/actions-submission";

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
