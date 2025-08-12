import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

export const UserHeader = () => (
  <div className={styles.header}>
    <BedrockText text="User Profile" type="h1" color="white" font="Minecraft" />
  </div>
);
