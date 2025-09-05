import { BedrockText } from "~/components/bedrock/bedrock-text";

interface HeroTitleProps {
  title: string;
}

export const HeroTitle = ({ title }: HeroTitleProps) => (
  <BedrockText text={title} type ="h1" textAlign="start" color="white" font="MinecraftTen" />
);
