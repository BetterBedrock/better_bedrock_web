"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupConfirmation } from "@/shared/ui/popup";
import { Routes } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";

import styles from "./project-card-preview.module.scss";
import { useNotification } from "../../../../../app/providers/notification";
import { publishProject } from "@/entities/project";
import { useProjectManager } from "@/app/providers/project-manager";

export const ProjectCardPreviewActionsPublish = () => {
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
        <BedrockText text="Publish" type="p" color="black" />
      </Button>
    </PopupConfirmation>
  );
};
