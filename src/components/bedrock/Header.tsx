import React, { ReactNode } from "react";
import "../../App.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";
import './Header.css'

interface HeaderProps {
  text: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  textType?: BedrockTextType;
  font?: string;
  height: string;
  width: string;
}

const Header: React.FC<HeaderProps> = ({
  text,
  prefix,
  suffix,
  textType,
  font,
  height,
  width,
}) => {
  return (
    <Label width={width} height={height}>
      <div className="header-container">
        {/* Prefix */}
        {prefix && <div className="prefix">{prefix}</div>}
        {/* Center Text */}
        <div className="center">
          <BedrockText
            text={text}
            type={textType ?? BedrockTextType.h1}
            textAlign="center"
            font={font}
          />
        </div>
        {/* Suffix */}
        {suffix && <div className="suffix">{suffix}</div>}
      </div>
    </Label>
  );
};

export default Header;
