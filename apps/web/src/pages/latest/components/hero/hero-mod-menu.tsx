import { BedrockText } from "~/components/bedrock/bedrock-text";
import { HeroGallery } from "~/pages/latest/components/hero/hero-gallery";

export const HeroModMenu = () => {
  return (
    <>
      <BedrockText text="Mod Menu" type="h1" font="Minecraft" textAlign="left" color="white" />
      <BedrockText
        text="This is a mod menu for the Better Bedrock Texture Pack. It allows you to customize your experience with various options and settings."
        type="p"
        color="white"
        textAlign="left"
      />
      <HeroGallery />
    </>
  );
};
