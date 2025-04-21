import { BedrockText } from "~/components/bedrock/text";

interface CardTitleProps {
  title: string;
}

export const CardTitle = ({ title }: CardTitleProps) => (
  <BedrockText text={title} type="h1" font="MinecraftTen" color="white" textAlign="center" />
);
