import { BedrockText } from "~/components/bedrock/bedrock-text";

interface HeaderTitleProps {
  title: string;
}

export const HeaderTitle = ({ title }: HeaderTitleProps) => (
  <BedrockText text={title} type="h1" textAlign="start" color="white" font="Minecraft" />
);
