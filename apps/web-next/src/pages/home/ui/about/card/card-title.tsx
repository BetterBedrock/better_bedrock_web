import { BedrockText } from "@/shared/ui/bedrock-text";

interface CardTitleProps {
  title: string;
}

export const CardTitle = ({ title }: CardTitleProps) => (
  <BedrockText
    text={title}
    type="h2"
    font="Minecraft"
    color="white"
    textAlign="center"
  />
);
