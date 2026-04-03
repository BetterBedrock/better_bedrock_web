"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup";

import { ProjectCardPreviewPublishPopup } from "@/pages/project/ui/project-card-preview/project-card-preview-publish-popup";

export const ProjectCardPreviewActionsPublish = () => {
  return (
    <PopupWrapper popup={(close) => <ProjectCardPreviewPublishPopup onClose={close} />}>
      <Button
        id="publish-button"
        width="100%"
        height="100%"
        type="gold"
        center
      >
        <BedrockText text="Publish Project" type="p" color="white" />
      </Button>
    </PopupWrapper>
  );
};
