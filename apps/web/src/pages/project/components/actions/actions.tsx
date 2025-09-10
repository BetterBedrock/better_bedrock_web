import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PopupConfirmation } from "~/components/bedrock/popup/popup-confirmation";
import { ButtonGroup } from "~/components/button-group/button-group";
import { ActionsSave } from "~/pages/project/components/actions/actions-save";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

export const Actions = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const {
    submitProject,
    cancelSubmission,
    deleteProject,
    deleteProductionProject,
    fetchProjectDetails,
  } = useProject();
  const { handleSaveProject, selectedProject, setSelectedProject } = useProjectManager();

  const [existsProductionProject, setExistsProductionProject] = useState(false);

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

  const handleDelete = async (publicOnly?: boolean) => {
    if (!selectedProject) return;

    if (publicOnly) {
      await deleteProductionProject(selectedProject.id, selectedProject.title);
    } else {
      await deleteProject(selectedProject.id, selectedProject.title);
    }

    sendNotification({
      title: "Deleted",
      label: "Successfully deleted project",
      type: "success",
    });

    navigate(Routes.HOME);
  };

  useEffect(() => {
    fetchProjectDetails(selectedProject!.id, false).then((data) =>
      setExistsProductionProject(!!data),
    );
  }, []);

  return (
    <ButtonGroup>
      <ActionsSave onClick={async () => await handleSaveProject(selectedProject!)} />

      <PopupConfirmation
        description="You are about to submit your project for verification process which will take up to 24h, if you are unsure, or want to make a change, you can alaways cancel the submission."
        confirmText="Submit"
        ignore={selectedProject?.submitted}
      >
        <Button width="100%" type="dark" onClick={handleSubmission} center>
          <BedrockText
            text={selectedProject?.submitted ? "Cancel Submission" : "Submit for review"}
            type="p"
            color="white"
          />
        </Button>
      </PopupConfirmation>

      <PopupConfirmation
        description="Are you sure you want to delete this project? Both the released and draft versions will be deleted."
        confirmText="Delete"
        confirmType="red"
      >
        <Button width="100%" type="red" center onClick={() => handleDelete(false)}>
          <BedrockText text={"Delete Entire Project"} type="p" color="white" />
        </Button>
      </PopupConfirmation>

      {existsProductionProject && (
        <PopupConfirmation
          description="Are you sure you want to delete this project? Only public version of this project will be deleted. The draft and statistics will remain untouched."
          confirmText="Delete"
          confirmType="red"
        >
          <Button width="100%" type="red" center onClick={() => handleDelete(true)}>
            <BedrockText text={"Delete Public Project"} type="p" color="white" />
          </Button>
        </PopupConfirmation>
      )}
    </ButtonGroup>
  );
};
