import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PopupConfirmation } from "~/components/bedrock/popup/popup-confirmation";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { ButtonGroup } from "~/components/button-group/button-group";
import { ActionsDeletePopup } from "~/pages/project/components/actions/actions-delete-popup";
import { ActionsSave } from "~/pages/project/components/actions/actions-save";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";

export const Actions = () => {
  const {
    submitProject,
    cancelSubmission,
  } = useProject();
  const { handleSaveProject, selectedProject, setSelectedProject } = useProjectManager();

  const handleSubmission = async () => {
    if (!selectedProject) return;

    if (!selectedProject.submitted) {
      await handleSaveProject(selectedProject);
      const submission = await submitProject(selectedProject.id, selectedProject.title);

      if (!submission) return;
      setSelectedProject((prev) => ({ ...prev!, submitted: true, error: null }));
    } else {
      await cancelSubmission(selectedProject.id, selectedProject.title);
      setSelectedProject((prev) => ({ ...prev!, submitted: false }));
    }
  };

  return (
    <ButtonGroup>
      <ActionsSave onClick={async () => await handleSaveProject(selectedProject!)} />

      <PopupConfirmation
        description="You are about to submit your project for verification process which will take up to 24h, if you are unsure, or want to make a change, you can alaways cancel the submission."
        confirmText="Submit"
        ignore={selectedProject?.submitted}
      >
        <Button width="100%" height="100%" type="white" onClick={handleSubmission} center>
          <BedrockText
            text={selectedProject?.submitted ? "Cancel Submission" : "Submit for review"}
            type="p"
            color="black"
          />
        </Button>
      </PopupConfirmation>

      <PopupWrapper popup={(close) => <ActionsDeletePopup close={close} />}>
        <Button width="100%" height="100%" type="red" center>
          <BedrockText text="Deletion Options" type="p" color="white" />
        </Button>
      </PopupWrapper>

    </ButtonGroup>
  );
};
