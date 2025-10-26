import { BedrockText } from "@/app/_components/bedrock-text";

interface ModuleTitleProps {
  text: string;
}

export const ModuleTitle = ({ text }: ModuleTitleProps) => (
  <BedrockText text={text} type="h2" font="Minecraft" color="white" />
);