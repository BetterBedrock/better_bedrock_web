import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";

import { ActionsDeletePopup, styles } from ".";

export const ActionsDelete = () => (
  <PopupWrapper popup={(close) => <ActionsDeletePopup close={close} />} className={styles.button}>
    <Button width="100%" height="100%" type="red" center>
      <BedrockText text="Deletion Options" type="p" color="white" />
    </Button>
  </PopupWrapper>
);
