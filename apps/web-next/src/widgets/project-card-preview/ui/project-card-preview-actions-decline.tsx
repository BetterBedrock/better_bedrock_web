"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup/popup-wrapper";
import { ProjectCardPreviewDeclinePopup } from "@/widgets/project-card-preview/ui/project-card-preview-decline-popup";
import { useProjectManager } from "@/shared/model/project-manager";
import { Routes } from "@/shared/model/routes";
import { useRouter } from "next/navigation";

import styles from "./project-card-preview.module.scss";
import { useNotification } from "@/shared/model/notification";
import { declineProject } from "@/entities/project/api/decline-project";

export const ProjectCardPreviewActionsDecline = () => {
  const router = useRouter();
  const { sendNotification, throwError } = useNotification();
  const { selectedProject } = useProjectManager();

  return (
    <PopupWrapper
      className={styles.button}
      popup={(close) => (
        <ProjectCardPreviewDeclinePopup
          onCancel={close}
          onSubmit={async (reason) => {
            const { error } = await declineProject(selectedProject!.id, reason);

            if (error) {
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
