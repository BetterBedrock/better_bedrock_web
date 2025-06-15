import { styles } from ".";
import defaultImage from "~/assets/images/example_head.png";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface ModuleCardProp {
  title: string;
  description: string;
  creator?: boolean;
}

export const ModuleCard = ({ title, description, creator }: ModuleCardProp) => {

  return (
    <Button
      width="auto"
      height="auto"
      type={creator ? "alwaysGreen" : "alwaysWhite"}
      lockClicking={true}
      playSound={false}
      className={styles.card}
    >
      <div className={styles.content}>
        <img alt="Minecraft Profile Picture" src={defaultImage} />
        <div className={styles.description}>
          <div className={styles.title}>
            <BedrockText
              text={title}
              type="h2"
              font="MinecraftTen"
              textAlign="left"
              style={{ padding: "0 0.5rem 0 0" }}
            />
          </div>
          <BedrockText text={description} type="p" textAlign="left" />
        </div>
      </div>
    </Button>
  );
};
