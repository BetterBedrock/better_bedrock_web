import { BedrockText } from "~/components/bedrock/bedrock-text";
import { ExtensionsGallery } from "./extensions-gallery";
import { styles } from "../hero";

export const Extensions = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Many Extension Packs" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="Extra packs like Waypoints, Better Fogs, and Dark Mode are designed to improve your Minecraft experience!"
        type="p"
        color="white"
        textAlign="center"
      />
      <ExtensionsGallery />
    </div>
  );
};
