import { BedrockText } from "@/_components/bedrock-text";

interface HeadingTitleProps {
  title: string;
}

export const HeadingTitle = ({ title }: HeadingTitleProps) => (
  <BedrockText type="h1" text={title} color="white" font="Minecraft" textAlign="center" />
);
