import { BedrockText } from "@/app/_components/bedrock-text";

interface ModuleDescriptionProps {
  text: string;
}

export const ModuleDescription = ({ text }: ModuleDescriptionProps) => (
  <BedrockText type="p" textAlign="center" color="white" text={text} />
);
