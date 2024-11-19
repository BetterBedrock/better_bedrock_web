import React from "react";
import "./CreatorCard.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";

interface CreatorCardProp {}

const CreatorCard: React.FC<CreatorCardProp> = () => {
  return (
    <Label height="100px" width="400px">
      <div className="creator-card-content">
        <div className="creator-card-image">
          <img
            alt=""
            src={require("../../assets/images/example_head.png")}
          ></img>
        </div>
        <div className="creator-card-description">
          <BedrockText
            text="iDarkQ"
            type={BedrockTextType.h2}
            font="Minecraft"
            strong
          ></BedrockText>
          <BedrockText text="Mobile App ▪ Website ▪ Windows Client ▪ Mobile Client" type={BedrockTextType.p3}></BedrockText>
        </div>
      </div>
    </Label>
  );
};

export default CreatorCard;
