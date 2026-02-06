import { BedrockText } from "@/shared/ui/bedrock-text";

export const HeroHeader = () => (
  <>
    <BedrockText text="Create new project" type="h1" color="white" font="Minecraft" />
    <BedrockText
      text="First of all... Let's name this project. Later fill up the details in dedicated editor!"
      type="p"
      color="white"
    />
  </>
);
