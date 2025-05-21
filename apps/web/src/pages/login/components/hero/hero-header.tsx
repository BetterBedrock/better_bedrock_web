import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

export const HeroHeader = () => (
  <div className={styles.header}>
    <BedrockText text="Login" type="h1" color="white" font="Minecraft" />
    <BedrockText text="Input password used for the admin panel access" type="p" color="white" />
  </div>
);
