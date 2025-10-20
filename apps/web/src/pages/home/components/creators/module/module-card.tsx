import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { CreatorsListElement } from "~/pages/home/components/creators";

interface ModuleCardProp {
  data: CreatorsListElement;
}

export const ModuleCard = ({ data }: ModuleCardProp) => (
  <Button
    width="auto"
    height="auto"
    type={data.creator ? "green" : "white"}
    lockClicking={true}
    playSound={false}
    className={styles.card}
  >
    <div className={styles.content}>
      <img
        alt="Minecraft Profile Picture"
        src={data.profileId ? `https://mc-heads.net/avatar/${data.profileId}/8/8` : data.skin}
      />
      <div className={styles.description}>
        <div className={styles.title}>
          <BedrockText
            text={data.name}
            type="h3"
            font="Minecraft"
            textAlign="left"
            color={data.creator ? "white" : "black"}
            extraClassName={styles.creator}
          />
        </div>
        <BedrockText
          text={data.description ?? ""}
          color={data.creator ? "white" : "black"}
          type="p"
          textAlign="left"
        />
      </div>
    </div>
  </Button>
);
