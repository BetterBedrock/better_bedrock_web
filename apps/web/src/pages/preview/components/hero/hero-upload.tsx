import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

export const HeroUpload = () => (
  <Button
    className={styles.action}
    width="100%"
    type="green"
    center
  >
    <BedrockText text="Upload File" type="p" color="white" />
  </Button>
);
