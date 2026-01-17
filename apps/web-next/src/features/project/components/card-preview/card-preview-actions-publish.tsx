"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupConfirmation } from "@/components/popup/popup-confirmation";
import { useProjectManager } from "@/features/project/providers/project-manager";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

import styles from "./card-preview.module.scss";
import { useNotification } from "@/providers/notification";
import { publishProject } from "@/features/project/server/publish-project";

export const CardPreviewActionsPublish = () => {
  const router = useRouter();
  const { sendNotification, throwError } = useNotification();
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
          const { error } = await publishProject(selectedProject!.id);

          if (error) {
            throwError(null, error);
            return;
          }

          sendNotification({
            type: "success",
            title: selectedProject!.title,
            label: "The project has been published",
          });

          router.push(Routes.PANEL_PROJECTS);
        }}
      >
        <BedrockText text="Publish" type="p" color="white" />
      </Button>
    </PopupConfirmation>
  );
};
