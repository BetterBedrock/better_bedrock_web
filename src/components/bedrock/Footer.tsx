import React from "react";
import "./Footer.css";
import Label from "./Label";

interface FooterProps {
  height: string;
  width: string;
}

const Footer: React.FC<FooterProps> = ({ width, height }) => {
  return (
    <Label width={width} height={height} rotated>
      <p className="center footer-text">
        Copyright © Better Bedrock | All rights reserved | Not affiliated with
        Mojang Studios
      </p>
    </Label>
  );
};

export default Footer;
