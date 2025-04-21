import { BedrockText } from "~/components/bedrock/text";
import { styles } from ".";

export const HeroDescription = () => (
  <div className={styles.description}>
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="Is the most powerful, customizable, useful and free Texture Pack available on the majority of platforms!"
    />
  </div>
);
