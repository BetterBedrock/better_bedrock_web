import { BedrockText } from "~/components/bedrock/bedrock-text";
import { MenuModsGallery } from "./menu-mods-gallery";
import { styles } from "../hero";

export const MenuMods = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Mod Menu: Mods" type="h1" font="Minecraft" textAlign="center" color="white" />
      <BedrockText
        text="Place where you can find key mods of Better Bedorck and adjust their options. With Extra Tabs like Compatibility and Config, you can find possible issues or check your configuration."
        type="p"
        color="white"
        textAlign="center"
      />
      <MenuModsGallery />
    </div>
  );
};
