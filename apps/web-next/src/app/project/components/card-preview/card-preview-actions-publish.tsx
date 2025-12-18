"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { PopupConfirmation } from "@/_components/popup/popup-confirmation";
import { useProject } from "@/_providers/project";
import { useProjectManager } from "@/app/project/providers/project-manager";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

import styles from "./card-preview.module.scss";

export const CardPreviewActionsPublish = () => {
  const router = useRouter();

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
          router.push(Routes.PANEL_PROJECTS);
        }}
      >
        <BedrockText text="Publish" type="p" color="white" />
      </Button>
    </PopupConfirmation>
  );
};
