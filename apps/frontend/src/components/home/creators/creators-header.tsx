import { BedrockText } from "../../bedrock/text/bedrock-text";
import styles from "./creators.module.css";
import DownloadCard from "components/bedrock/download-card/download-card";

export const CreatorsHeader = () => (
  <div className={styles.headerContainer}>

    <div className={styles.creators}>
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
        text="Meet the Better Bedrock helpers. We really appreciate your work and time spent helping us and the people! You did great job."
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

const CREATORS = [
  {
    name: "AxmBro",
    description: "Texture Pack, Website, Discord"
  },
  {
    name: "iDarkQ",
    description: "Texture Pack, Website, Discord"
  }
]

const HELPERS = [
  {
    name: "Bestfurth",
  },
  {
    name: "Ayaanthe0ne",
  },
  {
    name: "Viridlmao",
  },
  {
    name: "Sparkskye",
  }
]