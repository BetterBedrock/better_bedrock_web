import React from "react";
import "./Footer.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";

interface FooterProps {
  width: string;
}

const Footer: React.FC<FooterProps> = ({ width }) => {
  return (
    <footer>
      <Label width={width}>
        <div className="footer-text">
          <BedrockText
            text="Copyright © Better Bedrock | All rights reserved | Not affiliated with
        Mojang Studios"
            type={BedrockTextType.p1}
            textAlign="center"
          />
        </div>
      </Label>
    </footer>
  );
};

export default Footer;
