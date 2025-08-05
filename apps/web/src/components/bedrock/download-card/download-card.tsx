import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { ButtonType, Button } from "~/components/bedrock/button";

interface DownloadCardProp {
  title?: string;
  description?: string;
  iconPath?: string;
  downloadSize?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
  tags?: string[];
  titleColor?: string;
  tagBgColor?: string;
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  iconPath,
  downloadSize,
  buttonType = "white",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
  tags,
  titleColor,
  tagBgColor = "rgb(35, 35, 35)"
}) => {
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
        <img alt="" src={iconPath} style={{ imageRendering: "pixelated" }} />
        <div className={styles.description}>
          <div className={styles.title}>
            <BedrockText
              color={titleColor ? titleColor : buttonType === "white" ? "black" : "white"}
              text={title ?? ""}
              type={"h2"}
              font="MinecraftTen"
              textAlign="left"
              style={{ padding: "0 0.5rem 0 0" }}
            />
            <BedrockText
              text={downloadSize ?? ""}
              type={"h3"}
              font="MinecraftTen"
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
                <p key={tag} className={styles.tag} style={{
                  backgroundColor: tagBgColor
                }}>
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
