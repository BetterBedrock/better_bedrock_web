import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";

import { styles } from ".";

interface PreviewPopupVoucherActionProps {
  activate: () => Promise<void>;
}

export const PreviewPopupVoucherAction = ({ activate }: PreviewPopupVoucherActionProps) => (
  <Button type="dark" onClick={activate} center>
    <BedrockText
      color="white"
      type="p"
      text="Apply"
      extraClassName={styles.apply}
    />
  </Button>
);