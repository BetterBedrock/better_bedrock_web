import { BedrockText } from "~/components/bedrock/bedrock-text";
import { MenuSettingsGallery } from "./menu-settings-gallery";
import { styles } from "../hero";

export const MenuSettings = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Mod Menu: Settings" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="Manage either vanilla, misc or even mod menu settings right there!"
        type="p"
        color="white"
        textAlign="center"
      />
      <MenuSettingsGallery />
    </div>
  );
};
