"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupWrapper } from "@/components/popup/popup-wrapper";
import { CardPreviewDeclinePopup } from "@/features/project/components/card-preview/card-preview-decline-popup";
import { useProjectManager } from "@/features/project/providers/project-manager";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

import styles from "./card-preview.module.scss";
import { useNotification } from "@/providers/notification";
import { declineProject } from "@/features/project/server/decline-project";

export const CardPreviewActionsDecline = () => {
  const router = useRouter();
  const { sendNotification, throwError } = useNotification();
  const { selectedProject } = useProjectManager();

  return (
    <PopupWrapper
      className={styles.button}
      popup={(close) => (
        <CardPreviewDeclinePopup
          onCancel={close}
          onSubmit={async (reason) => {
            const {error} = await declineProject(selectedProject!.id, reason);

            if(error) {
              throwError(null, error);
              return;
            }
            
            sendNotification({
              type: "success",
              title: selectedProject!.title,
              label: "The project has been declined",
            });
            
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
