import { ButtonGroup } from "~/components/button-group/button-group";
import { ActionsDelete, ActionsSave, ActionsSubmission, useActions } from ".";

export const Actions = () => {
  const { selectedProject } = useActions();

  return (
    <ButtonGroup>
      {!selectedProject!.submitted && <ActionsSave />}
      <ActionsSubmission />
      <ActionsDelete />
    </ButtonGroup>
  );
};
