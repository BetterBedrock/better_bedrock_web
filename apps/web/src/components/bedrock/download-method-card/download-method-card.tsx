import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { ButtonType, Button } from "~/components/bedrock/button";

interface DownloadMethodCardProp {
  label?: string;
  title?: string;
  price?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
  color?: string;
}

export const DownloadMethodCard = ({
  title,
  price,
  buttonType = "white",
  color = "black",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
}: DownloadMethodCardProp) => (
  <Button
    width="100%"
    height={height}
    type={buttonType}
    lockClicking={lockClicking}
    playSound={playSound}
    onClick={onClick}
  >
    <div className={styles.content}>
      <BedrockText
        text={price ?? ""}
        type="h1"
        font="Minecraft"
        textAlign="left"
        extraClassName={styles.price}
        color={color}
      />
      <div className={styles.description}>
        <BedrockText text={title ?? ""} type="p" textAlign="left" color={color} />
      </div>
    </div>
  </Button>
);
