import { Label } from "../label";
import { BedrockText } from "../bedrock-text";
import ExampleHead from "~/assets/images/example_head.png";

import { styles } from ".";

interface CreatorCardProp {
  name?: string;
  description?: string[];
  width: string;
  height: string;
}

export const CreatorCard = ({ name, description, width, height }: CreatorCardProp) => (
  <Label height={height} width={width}>
    <div className={styles.content}>
      <div className={styles.image}>
        <img alt="Minecraft Profile Head" src={ExampleHead} />
      </div>
      <div className={styles.description}>
        <BedrockText text={name ?? "iDarkQ"} type="h2" font="MinecraftTen" />
        <BedrockText text={description?.join(", ") ?? ""} type="p" />
      </div>
    </div>
  </Label>
);
