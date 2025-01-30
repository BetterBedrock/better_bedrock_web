import { BedrockText } from "../../bedrock/text/bedrock-text";
import homeStyles from "pages/home/home.module.css";
import styles from "./hero.module.css";

export const HeroHeader = () => (
  <div id={styles.headers} className={homeStyles.page_element}>
    <BedrockText
      type={"h1"}
      text="Better Bedrock"
      color="white"
      font="Minecraft"
      textAlign="center"
    ></BedrockText>
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="is the most powerful, customizable, useful and free Texture Pack available on the majority of platforms!"
    ></BedrockText>
  </div>
);
