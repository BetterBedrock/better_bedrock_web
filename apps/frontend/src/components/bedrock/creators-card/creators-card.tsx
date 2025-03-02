import { Label } from "../label";
import { BedrockText } from "../text/bedrock-text";
import ExampleHead from "assets/images/example_head.png";

import styles from "./creators-card.module.css";

interface CreatorCardProp {
  name?: string;
  description?: string[];
  width: string;
  height: string;
}

export const CreatorCard = ({
  name,
  description,
  width,
  height,
}: CreatorCardProp) => (
  <Label height={height} width={width}>
    <div className={styles.content}>
      <div className={styles.card_image}>
        <img alt="" src={ExampleHead}></img>
      </div>
      <div className={styles.card_description}>
        <BedrockText
          text={name ?? "iDarkQ"}
          type={"h2"}
          font="MinecraftTen"
        ></BedrockText>
        <BedrockText
          text={description?.join(", ") ?? ""}
          type={"p"}
        ></BedrockText>
      </div>
    </div>
  </Label>
);
