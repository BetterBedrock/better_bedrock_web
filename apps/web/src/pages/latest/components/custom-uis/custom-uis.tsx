import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CustomUisGallery } from "./custom-uis-gallery";
import { styles } from "../hero";

export const CustomUis = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Custom Uis" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="Revamped custom UIs offer a refreshed design, giving Minecraft's main screens a sleek and updated look!"
        type="p"
        color="white"
        textAlign="center"
      />
      <CustomUisGallery />
    </div>
  );
};
