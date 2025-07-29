import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from "../hero";
import { MenuInfoGallery } from "./menu-info-gallery";

export const MenuInfo = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Mod Menu: Information" type="h1" font="MinecraftTen" textAlign="center" color="white" />
      <BedrockText
        text="Get detailed information about general stuff, texture pack features, and how to use it effectively!"
        type="p"
        color="white"
        textAlign="center"
      />
      <MenuInfoGallery />
    </div>
  );
};
