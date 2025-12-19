"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupWrapper } from "@/components/popup/popup-wrapper";
import { ActionsDeletePopup } from "@/app/(projects)/project/components/actions/actions-delete-popup";
import styles from "./actions.module.scss";

export const ActionsDelete = () => (
  <PopupWrapper
    popup={(close) => <ActionsDeletePopup close={close} />}
    className={styles.button}
  >
    <Button width="100%" height="100%" type="red" center>
      <BedrockText text="Deletion Options" type="p" color="white" />
    </Button>
  </PopupWrapper>
);
