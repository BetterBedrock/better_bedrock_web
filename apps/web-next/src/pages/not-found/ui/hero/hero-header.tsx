import { BedrockText } from "@/shared/ui/bedrock-text";

export const HeroHeader = () => (
  <>
    <BedrockText text="Error 404" type="h1" color="white" font="Minecraft" />
    <BedrockText
      text="This path is invalid. Click the buttons below to navigate to the correct paths."
      type="p"
      color="white"
    />
  </>
);
