import { BedrockText } from "~/components/bedrock/bedrock-text";
import { GameplayGallery } from "~/pages/latest/components/gameplay/gameplay-gallery";
import { styles } from "../hero";

export const Gameplay = () => {
  return (
    <div className={styles.subSection}>
      <BedrockText text="Gameplay on Another Level" type="h1" font="Minecraft" textAlign="center" color="white" />
      <BedrockText
        text="Improved experience with HUD mods, making gameplay more immersive and strategic!"
        type="p"
        color="white"
        textAlign="center"
      />
      <GameplayGallery />
    </div>
  );
};
