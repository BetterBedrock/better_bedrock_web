import React, { ReactNode } from "react";
import Label from "./Label";
import '../../App.css';

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
  const spacer = <div className="spacer" style={{width: `calc((${height} - (var(--minecraftdepth)*2)))`, height: `calc((${height} - (var(--minecraftdepth)*2)))`}}></div>
  return (
    <Label width={width} height={height} rotated>
      {prefix ? prefix : spacer}
      <p className="header-text">{text}</p>
      {suffix ? suffix : spacer}
    </Label>
  );
};

export default Header;
