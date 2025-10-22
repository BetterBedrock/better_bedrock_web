import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { CardPreviewDeclinePopup } from "~/pages/project/components/card-preview/card-preview-decline-popup";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

import { styles } from ".";

export const CardPreviewActionsDecline = () => {
  const navigate = useNavigate();

  const { decline } = useProject();
  const { selectedProject } = useProjectManager();

  return (
    <PopupWrapper
      className={styles.button}
      popup={(close) => (
        <CardPreviewDeclinePopup
          onCancel={close}
          onSubmit={async (reason) => {
            await decline(selectedProject!.id, selectedProject!.title, reason);
            navigate(Routes.PANEL_PROJECTS);
          }}
        />
      )}
    >
      <Button width="100%" type="red" center>
        <BedrockText text="Decline Project" type="p" color="white" />
      </Button>
    </PopupWrapper>
  );
};
