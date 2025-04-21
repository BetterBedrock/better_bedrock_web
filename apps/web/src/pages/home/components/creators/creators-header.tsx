import { CREATORS, HELPERS } from "~/pages/home/components/creators";
import { BedrockText } from "../../../../components/bedrock/text/bedrock-text";
import styles from "./creators.module.css";
import DownloadCard from "~/components/bedrock/download-card/download-card";

export const CreatorsHeader = () => (
  <div className={styles.headerContainer}>

    <div className={styles.creators}>
      <BedrockText
        text="CREATORS"
        type="h1"
        font="MinecraftTen"
        color="white"
      />
      <BedrockText
        type="p"
        textAlign="center"
        color="white"
        text="Meet the creators behind the project! Initially created by AmBro, then extended by iDarkQ. See below the parts they are responsible for!"
      />
      <div className={styles.cardsContainerCreators}>
        {CREATORS.map((item) => {
          return (
            <DownloadCard
              key={item.name}
              buttonType="alwaysGreen"
              title={item.name}
              description={item.description}
              playSound={false}
              lockClicking={true}
            />
          )
        })}
      </div>
    </div>

    <div className={styles.helpers}>
      <BedrockText
        text="Helpers"
        type={"h1"}
        font="MinecraftTen"
        color="white"
      />
      <BedrockText
        type={"p"}
        textAlign="center"
        color="white"
        text="Meet the Better Bedrock helpers. These people have significantly contributed to the development of many features in the TexturePack."
      />
      <div className={styles.cardsContainerHelpers}>
        {HELPERS.map((item) => {
          return (
            <DownloadCard
              key={item.name}
              title={item.name}
              playSound={false}
              lockClicking={true}
            />
          )
        })}
      </div>
    </div>

  </div>
);

