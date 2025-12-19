import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";

import styles from "./preview-popup-voucher.module.scss";

interface PreviewPopupVoucherActionProps {
  activate: () => Promise<void>;
}

export const PreviewPopupVoucherAction = ({
  activate,
}: PreviewPopupVoucherActionProps) => (
  <Button type="dark" onClick={activate} center>
    <BedrockText
      color="white"
      type="p"
      text="Apply"
      extraClassName={styles.apply}
    />
  </Button>
);
