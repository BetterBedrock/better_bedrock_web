"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupConfirmation } from "@/shared/ui/popup/popup-confirmation";
import { useActions } from "@/widgets/project-actions/model/use-actions";

import styles from "./project-actions.module.scss";

export const ProjectActionsSubmission = () => {
  const { handleSubmission, selectedProject } = useActions();

  return (
    <PopupConfirmation
      description="You are about to submit your project for verification process which will take up to 24h, if you are unsure, or want to make a change, you can alaways cancel the submission."
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
              ? "Cancel Submission"
              : "Submit for review"
          }
          type="p"
          color="black"
        />
      </Button>
    </PopupConfirmation>
  );
};
