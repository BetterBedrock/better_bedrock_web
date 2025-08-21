import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

interface HeroTitleProps {
  title: string;
}

export const HeroTitle = ({ title }: HeroTitleProps) => (
  <div className={styles.title}>
    <BedrockText text={title} type="h1" textAlign="start" color="white" font="MinecraftTen" />
  </div>
);
