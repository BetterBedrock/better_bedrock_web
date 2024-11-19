import React from "react";
import "./Footer.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";

interface FooterProps {
  height: string;
  width: string;
}

const Footer: React.FC<FooterProps> = ({ width, height }) => {
  return (
    <Label width={width} rotated>
      <div className="footer-text">
        <BedrockText
          text="Copyright © Better Bedrock | All rights reserved | Not affiliated with
        Mojang Studios"
          type={BedrockTextType.p3}
          textAlign="center"
        />
      </div>
    </Label>
  );
};

export default Footer;
