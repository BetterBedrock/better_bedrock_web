import { BedrockText } from "components/bedrock/text";
import styles from "./creators.module.css";

export const CreatorsTrailer = () => (
  <div className={styles.videoContainer}>
    <BedrockText
      type={"h1"}
      textAlign="center"
      color="white"
      text="Latest changelog video"
      font="MinecraftTen"
    />
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="Watch Better Bedrock v7.2 Changelog Showcase"
    />
    <div className={styles.videoIframeContainer}>
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Oz2cnztzSMw" title="Better Bedrock Changelog v7.2 #1 | Client release on windows! | New Texture Pack version | Showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  </div>
);
