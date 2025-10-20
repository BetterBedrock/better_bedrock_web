import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

export const SubmittedOverlay = () => (
  <div className={styles.overlay}>
    <BedrockText type="h2" text="The project has been submitted" color="white" font="Minecraft" />
    <BedrockText
      type="p"
      text="Any edits are no longer saved. To edit content, cancel submission"
      color="white"
    />
  </div>
);
