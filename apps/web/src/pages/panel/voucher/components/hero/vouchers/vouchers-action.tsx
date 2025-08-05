import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

interface VouchersActionProps {
  handleCreateVoucherClick: () => void;
}

export const VouchersAction = ({handleCreateVoucherClick}: VouchersActionProps) => (
  <Button onClick={handleCreateVoucherClick} className={styles.button} type="green" center>
    <BedrockText color="white" type="p" text="Create Voucher" />
  </Button>
);
