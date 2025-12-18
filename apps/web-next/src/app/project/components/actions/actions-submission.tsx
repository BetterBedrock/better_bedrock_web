"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { PopupConfirmation } from "@/_components/popup/popup-confirmation";
import { useActions } from "@/app/project/components/actions/hooks/use-actions";

import styles from "./actions.module.scss";

export const ActionsSubmission = () => {
  const { handleSubmission, selectedProject } = useActions();

  return (
    <PopupConfirmation
      description="You are about to submit your project for verification process which will take up to 24h, if you are unsure, or want to make a change, you can alaways cancel the submission."
      confirmText="Submit"
      ignore={selectedProject?.submitted}
      className={styles.button}
    >
      <Button width="100%" height="100%" type="white" onClick={handleSubmission} center>
        <BedrockText
          text={selectedProject?.submitted ? "Cancel Submission" : "Submit for review"}
          type="p"
          color="black"
        />
      </Button>
    </PopupConfirmation>
  );
};
