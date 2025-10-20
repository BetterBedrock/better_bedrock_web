import { BedrockText } from "~/components/bedrock/bedrock-text";
import { HeroMarkdown, styles } from ".";

export const Hero = () => (
  <>
    <BedrockText type="h1" text="Privacy Policy" color="white" font="Minecraft" />
    <div className={styles.markdown}>
      <HeroMarkdown />
    </div>
  </>
);
