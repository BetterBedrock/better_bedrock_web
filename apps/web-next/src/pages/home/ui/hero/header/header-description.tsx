import { BedrockText } from "@/shared/ui/bedrock-text";
import styles from "./header.module.scss";

export const HeroDescription = () => (
  <div className={styles.description}>
    <BedrockText
      type="p"
      textAlign="center"
      color="white"
      text="Is the most powerful and customizable texture pack for Minecraft Bedrock Edition, now evolving into a dedicated platform where creators can share their projects and earn ad revenue."
    />
  </div>
);