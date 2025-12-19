import { ButtonGroup } from "@/components/button-group/button-group";
import { DetailedProjectDto } from "@/lib/api";
import { ActionsDelete } from "@/app/(projects)/project/components/actions/actions-delete";
import { ActionsSave } from "@/app/(projects)/project/components/actions/actions-save";
import { ActionsSubmission } from "@/app/(projects)/project/components/actions/actions-submission";

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
