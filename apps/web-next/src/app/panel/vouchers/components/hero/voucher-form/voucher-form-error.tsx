import { BedrockText } from "@/_components/bedrock-text";

import styles from "./voucher-form.module.scss";

interface VoucherFormErrorProps {
  message: string;
}

export const VoucherFormError = ({ message }: VoucherFormErrorProps) => (
  <BedrockText
    type="p2"
    extraClassName={styles.error}
    text={message}
    textAlign="start"
  />
);
