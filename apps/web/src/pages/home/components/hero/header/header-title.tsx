import { styles, HeaderStripes } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";

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
