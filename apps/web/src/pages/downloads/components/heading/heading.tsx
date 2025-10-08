import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => (
  <>
    <BedrockText type="h1" text={title} color="white" font="Minecraft" textAlign="center" />
    <BedrockText
      extraClassName={styles.description}
      type="p"
      textAlign="center"
      color="white"
      text={description}
    />
  </>
);
