import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from "../hero";
import { PlatformSupportGallery } from "./platform-support-gallery";

export const PlatformSupport = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Platform Support" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="And at the end of the day, you can use this Texture Pack on computer, later on your phone and finally on a friend's Console!"
        type="p"
        color="white"
        textAlign="center"
      />
      <PlatformSupportGallery />
    </div>
  );
};
