import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

export const AdLabel = () => (
  <BedrockText
    text="Looking for partnership? Dm me on discord @axmbro"
    type="p"
    textAlign="center"
    color="white"
    extraClassName={styles.label}
  />
);
