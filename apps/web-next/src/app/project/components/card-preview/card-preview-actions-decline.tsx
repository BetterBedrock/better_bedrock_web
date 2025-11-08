"use client";

import { useNavigate } from "react-router-dom";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { PopupWrapper } from "@/_components/popup/popup-wrapper";
import { useProject } from "@/_providers/project";
import { useProjectManager } from "@/app/project/providers/project-manager";
import { Routes } from "@/utils/routes";

import { CardPreviewDeclinePopup, styles } from ".";

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
