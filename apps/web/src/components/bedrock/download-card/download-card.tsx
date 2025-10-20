import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { ButtonType, Button } from "~/components/bedrock/button";
import { DownloadsItemTypeKey } from "~/assets/content/dto/downloads-item.dto";
import Icon1 from "~/assets/images/favicon.png";
import Icon2 from "~/assets/images/logo2.png";
import Icon3 from "~/assets/images/logo3.png";
import clsx from "clsx";

interface DownloadCardProp {
  title?: string;
  description?: string;
  downloadSize?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
  tags?: string[];
  type: DownloadsItemTypeKey;
}

const DownloadCard = ({
  title,
  description,
  downloadSize,
  buttonType = "white",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
  tags,
  type,
}: DownloadCardProp) => {
  const iconPath = type === "green" || type === "white" ? Icon1 : type === "yellow" ? Icon2 : Icon3;
  return (
    <Button
      width="100%"
      height={height}
      type={buttonType as ButtonType}
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}
    >
      <div className={styles.content}>
        <img alt="" src={iconPath} />
        <div className={styles.description}>
          <div className={styles.main}>
            <BedrockText
              text={title ?? ""}
              type="h3"
              font="Minecraft"
              textAlign="left"
              color={buttonType === "white" ? "black" : "white"}
              extraClassName={clsx(styles.title, styles[type])}
            />
            <BedrockText
              text={downloadSize ?? ""}
              type="h4"
              font="Minecraft"
              textAlign="left"
              color={buttonType === "white" ? "black" : "white"}
            />
          </div>
          <BedrockText
            text={description ?? ""}
            type="p"
            textAlign="left"
            color={buttonType === "white" ? "black" : "white"}
          />
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <p key={tag} className={clsx(styles.tag, styles[type])}>
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Button>
  );
};

export default DownloadCard;
