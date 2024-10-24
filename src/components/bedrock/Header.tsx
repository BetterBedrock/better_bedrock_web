import React, { ReactNode } from "react";
import Label from "./Label";

interface HeaderProps {
  text: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  height: string;
  width: string;
}

const Header: React.FC<HeaderProps> = ({
  text,
  prefix,
  suffix,
  width,
  height,
}) => {
  return (
    <Label width={width} height={height} rotated>
      {/* Prefix */}

      {prefix ? prefix : <div className="spacer"></div>}

      {/* Text */}

      <p className="center" style={{fontFamily: 'MinecraftTen'}}>{text}</p>

      {/* Suffix */}

      {suffix ? suffix : <div className="spacer"></div>}
    </Label>
  );
};

export default Header;
