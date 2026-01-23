"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup";
import { ProjectActionsDeletePopup } from "@/pages/project/ui/project-actions/project-actions-delete-popup";
import styles from "./project-actions.module.scss";

export const ProjectActionsDelete = () => (
  <PopupWrapper
    popup={(close) => <ProjectActionsDeletePopup close={close} />}
    className={styles.button}
  >
    <Button width="100%" height="100%" type="red" center>
      <BedrockText text="Deletion Options" type="p" color="white" />
    </Button>
  </PopupWrapper>
);
