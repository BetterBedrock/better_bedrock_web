"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupWrapper } from "@/components/popup/popup-wrapper";
import { useProject } from "@/providers/project";
import { CardPreviewDeclinePopup } from "@/features/project/components/card-preview/card-preview-decline-popup";
import { useProjectManager } from "@/features/project/providers/project-manager";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

import styles from "./card-preview.module.scss";

export const CardPreviewActionsDecline = () => {
  const router = useRouter();

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
            router.push(Routes.PANEL_PROJECTS);
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
