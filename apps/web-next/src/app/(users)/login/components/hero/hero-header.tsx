import { BedrockText } from "@/components/bedrock-text";

import styles from "./hero.module.scss";

export const HeroHeader = () => (
  <div className={styles.header}>
    <BedrockText text="Login" type="h1" color="white" font="Minecraft" />
    <BedrockText
      text="Create / Login into your Better Bedrock account by clicking the button below"
      type="p"
      color="white"
    />
  </div>
);
