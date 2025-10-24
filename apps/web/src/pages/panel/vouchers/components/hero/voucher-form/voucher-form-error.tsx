import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

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
