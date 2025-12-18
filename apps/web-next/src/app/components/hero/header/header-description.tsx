import { BedrockText } from "@/_components/bedrock-text";
import styles from "./header.module.scss";

export const HeroDescription = () => (
  <div className={styles.description}>
    <BedrockText
      type="p"
      textAlign="center"
      color="white"
      text="Is the source for the most powerful, customizable, useful and free Texture Packs where creators make 100% of the ad revenue!"
    />
  </div>
);
