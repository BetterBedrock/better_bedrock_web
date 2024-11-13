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
            text="Title"
            type={BedrockTextType.p}
            strong
          ></BedrockText>
          <BedrockText
            text="Description"
            type={BedrockTextType.p}
          ></BedrockText>
        </div>
      </div>
    </Label>
  );
};

export default CreatorCard;
