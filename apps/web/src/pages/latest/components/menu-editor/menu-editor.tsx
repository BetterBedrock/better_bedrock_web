import { BedrockText } from "~/components/bedrock/bedrock-text";
import { MenuEditorGallery } from "./menu-editor-gallery";
import { styles } from "../hero";

export const MenuEdiotr = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Mod Menu: Editor" type="h1" font="Minecraft" textAlign="center" color="white" />
      <BedrockText
        text="Change your crosshair image, color or size! Completely adjust hotbar slots and their elements - powerful feature for touch users!"
        type="p"
        color="white"
        textAlign="center"
      />
      <MenuEditorGallery />
    </div>
  );
};
