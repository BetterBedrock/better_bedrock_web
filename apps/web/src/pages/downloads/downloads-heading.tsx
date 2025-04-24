import { BedrockText } from "~/components/bedrock/text";
import { styles } from ".";

interface DownloadsHeadingProps {
  title: string;
  description: string;
}

export const DownloadsHeading = ({ title, description }: DownloadsHeadingProps) => (
  <>
    <BedrockText type="h1" text={title} color="white" font="MinecraftTen" textAlign="center" />
    <BedrockText
      extraClassName={styles.description}
      type="p"
      textAlign="center"
      color="white"
      text={description}
    />
  </>
);
