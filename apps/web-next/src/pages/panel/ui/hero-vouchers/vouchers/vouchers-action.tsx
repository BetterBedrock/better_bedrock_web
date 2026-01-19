import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";

import styles from "./vouchers.module.scss";

interface VouchersActionProps {
  handleCreateVoucherClick: () => void;
}

export const VouchersAction = ({
  handleCreateVoucherClick,
}: VouchersActionProps) => (
  <Button
    onClick={handleCreateVoucherClick}
    className={styles.button}
    type="green"
    center
  >
    <BedrockText color="white" type="p" text="Create Voucher" />
  </Button>
);
