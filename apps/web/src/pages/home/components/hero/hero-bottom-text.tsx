import { BedrockText } from "../../../../components/bedrock/text/bedrock-text";
import styles from "./hero.module.css";

export const HeroBottomText = () => (
  <div className={styles.bottomTextContainer}>
    <BedrockText
      type={"h1"}
      textAlign="center"
      color="white"
      text="Feature List"
      font="MinecraftTen"
    />
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="Scroll down to check out the main features of Better Bedrock!"
    />
  </div>
);
