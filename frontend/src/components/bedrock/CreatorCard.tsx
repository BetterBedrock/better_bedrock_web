import React from "react";
import "./CreatorCard.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";

interface CreatorCardProp {
  name?: string;
  description?: string[];
  width: string;
  height: string;
}

const CreatorCard: React.FC<CreatorCardProp> = ({
  name,
  description,
  width,
  height,
}) => {
  // const elements = description?.map((element) => {
  //   if(description.indexOf(element) !== elements?.length) {
  //     return element + " ▪ ";
  //   }

  //   return element;
  // });

  return (
    <Label height={height} width={width}>
      <div className="creator-card-content">
        <div className="creator-card-image">
          <img
            alt=""
            src={require("../../assets/images/example_head.png")}
          ></img>
        </div>
        <div className="creator-card-description">
          <BedrockText
            text={name ?? "iDarkQ"}
            type={BedrockTextType.h2}
            font="MinecraftTen"
            strong
          ></BedrockText>
          <BedrockText
            text={description?.join(" ▪ ") ?? ""}
            type={BedrockTextType.p3}
          ></BedrockText>
        </div>
      </div>
    </Label>
  );
};

export default CreatorCard;
