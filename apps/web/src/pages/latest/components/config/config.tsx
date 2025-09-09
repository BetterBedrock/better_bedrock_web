import { BedrockText } from "~/components/bedrock/bedrock-text";
import { ConfigGallery } from "./config-gallery";
import { styles } from "../hero";

export const Config = () => {
  return (
      <div className={styles.subSection}>
      <BedrockText text="Config System" type="h1" font="Minecraft" textAlign="center" color="white" />
      <BedrockText
        text="After you figure out mods, you are able to save all their states and edit some extra global options!"
        type="p"
        color="white"
        textAlign="center"
      />
      <ConfigGallery />
    </div>
  );
};
