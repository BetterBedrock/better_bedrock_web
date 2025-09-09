import { BedrockText } from "~/components/bedrock/bedrock-text";

interface CardTitleProps {
  title: string;
}

export const CardTitle = ({ title }: CardTitleProps) => (
  <BedrockText text={title} type="h1" font="Minecraft" color="white" textAlign="center" />
);
