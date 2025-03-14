import { BedrockText } from "components/bedrock/text";
import styles from "./hero.module.css";

export const HeroTrailer = () => (
  <div className={styles.trailerContainer}>
    <BedrockText
      type={"h1"}
      textAlign="center"
      color="white"
      text="Latest trailer"
      font="MinecraftTen"
    />
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="Watch the trailer for more detailed and explained information!"
    />
    <div className={styles.trailerIframeContainer}>
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/v5O-AG9P1Ag" title="BETTER BEDROCK V7 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  </div>
);
