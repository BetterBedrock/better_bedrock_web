import { BedrockText } from "@/shared/ui/bedrock-text";

interface DownloadsHeadingTitleProps {
  title: string;
}

export const DownloadsHeadingTitle = ({ title }: DownloadsHeadingTitleProps) => (
  <BedrockText
    type="h1"
    text={title}
    color="white"
    font="Minecraft"
    textAlign="center"
  />
);
