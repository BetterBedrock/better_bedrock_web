"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupConfirmation } from "@/shared/ui/popup";
import { useActions } from "../../model/use-actions";

import styles from "./project-actions.module.scss";

export const ProjectActionsSubmission = () => {
  const { handleSubmission, selectedProject } = useActions();

  return (
    <PopupConfirmation
      description="You are about to submit your project for the verification process, which may take up to 24 hours. If you are unsure or want to make a change, you can cancel the submission."
      confirmText="Submit"
      ignore={selectedProject?.submitted}
      className={styles.button}
    >
      <Button
        width="100%"
        height="100%"
        type="white"
        onClick={handleSubmission}
        center
      >
        <BedrockText
          text={
            selectedProject?.submitted
              ? "Cancel submission"
              : "Submit for review"
          }
          type="p"
          color="black"
        />
      </Button>
    </PopupConfirmation>
  );
};
