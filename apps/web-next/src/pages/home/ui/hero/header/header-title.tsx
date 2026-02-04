import { BedrockText } from "@/shared/ui/bedrock-text";
import { HeaderStripes } from "./header-stripes";

import styles from "./header.module.scss";

export const HeroTitle = () => (
  <span className={styles.heading}>
    <HeaderStripes side="right" />
    <BedrockText
      type="h1"
      text="Better Bedrock"
      color="white"
      font="Minecraft"
      textAlign="center"
      extraClassName={styles.title}
      shadow
    />
    <HeaderStripes side="left" />
  </span>
);
