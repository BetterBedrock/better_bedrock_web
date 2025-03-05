import { BedrockText } from "../../bedrock/text/bedrock-text";
import styles from "./creators.module.css";
import DownloadCard from "components/bedrock/download-card/download-card";

export const CreatorsHeader = () => (
  <div className={styles.headerContainer}>
    <BedrockText
      text="CREATORS"
      type={"h1"}
      font="MinecraftTen"
      color="white"
    />
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      text="Meet the creators behind the project! Initially created by AmBro, then extended by iDarkQ. See below the parts they are responsible for!"
    />
    <div className={styles.cardsContainer}>
      <DownloadCard
        title="AxmBro"
        description="Texture Pack, Website, Discord"
        playSound={false}
        isClicked={false}
      />
      <DownloadCard
        title="iDarkQ"
        description="Mobile App, Windows & Android Client, Website"
        playSound={false}
        isClicked={false}
      />
    </div>
  </div>
);
