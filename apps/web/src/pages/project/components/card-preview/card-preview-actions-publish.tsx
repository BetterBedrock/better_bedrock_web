import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PopupConfirmation } from "~/components/bedrock/popup/popup-confirmation";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

import { styles } from ".";

export const CardPreviewActionsPublish = () => {
  const navigate = useNavigate();

  const { publish } = useProject();
  const { selectedProject } = useProjectManager();

  return (
    <PopupConfirmation
      description="Are you sure you want to publish this project?"
      confirmText="Publish"
      confirmType="gold"
      className={styles.button}
    >
      <Button
        width="100%"
        height="100%"
        type="gold"
        center
        onClick={async () => {
          await publish(selectedProject!.id, selectedProject!.title);
          navigate(Routes.PANEL_PROJECTS);
        }}
      >
        <BedrockText text="Publish" type="p" color="white" />
      </Button>
    </PopupConfirmation>
  );
};
