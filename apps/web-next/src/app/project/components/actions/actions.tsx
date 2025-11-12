import { ButtonGroup } from "@/_components/button-group/button-group";
import { ActionsDelete, ActionsSave, ActionsSubmission, useActions } from ".";
import { DetailedProjectDto } from "@/_lib/api";

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
