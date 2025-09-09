import { BedrockText } from "~/components/bedrock/bedrock-text";

interface ModuleTitleProps {
  text: string;
}

export const ModuleTitle = ({ text }: ModuleTitleProps) => (
  <BedrockText text={text} type="h1" font="Minecraft" color="white" />
);