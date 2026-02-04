import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./hero.module.scss";

export const HeroHeader = () => (
  <div className={styles.header}>
    <BedrockText text="Login" type="h1" color="white" font="Minecraft" />
    <BedrockText
      text="Ready to share your work? Sign in or register now to publish your first project and enable ad revenue."
      type="p"
      color="white"
    />
  </div>
);
