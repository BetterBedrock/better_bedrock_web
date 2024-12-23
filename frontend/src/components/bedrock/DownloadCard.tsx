import React from "react";
import "./DownloadCard.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";

interface DownloadCardProp {
  title?: string;
  description?: string;
  width?: string;
  height?: string;
  iconPath?: string;
  downloadSize?: string;
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  width,
  height,
  iconPath,
  downloadSize
}) => {

  return (
    <div className="download-card-outline">
      <Label height={height ?? "auto"} width={width ?? "100%"}>
        <div className="download-card-content">
          <div className="download-card-image">
            <img
              alt=""
              src={iconPath ? require(iconPath) : require("../../assets/images/example_head.png")}
            ></img>
          </div>
          <div className="download-card-description">
            <div className="download-card-title">
              <BedrockText
                text={title ?? "{title}"}
                type={BedrockTextType.h2}
                font="MinecraftTen"
                strong
              ></BedrockText>
              <BedrockText
                text={downloadSize ?? "{downloadSize}"}
                type={BedrockTextType.h2}
                font="MinecraftTen"
                strong
              ></BedrockText>
            </div>
            <BedrockText
              text={description ?? "{description}"}
              type={BedrockTextType.p2}
            ></BedrockText>
          </div>
        </div>
      </Label>
    </div>
  );
};

export default DownloadCard;
