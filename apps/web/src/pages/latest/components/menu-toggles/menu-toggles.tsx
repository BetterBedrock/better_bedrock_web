import { BedrockText } from "~/components/bedrock/bedrock-text";
import { MenuTogglesGallery } from "./menu-toggles-gallery";
import { styles } from "../hero";

export const MenuToggles = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Mod Menu Toggles" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="To fit previous Mod Menu style, we have added option to minimalize view and also change it's opacity to see what's going on behind it!"
        type="p"
        color="white"
        textAlign="center"
      />
      <MenuTogglesGallery />
    </div>
  );
};
