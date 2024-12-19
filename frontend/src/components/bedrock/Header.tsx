import React, { ReactNode, useState } from "react";
import "../../App.css";
import Label from "./Label";
import { BedrockText, BedrockTextType } from "./BedrockText";
import "./Header.css";
import SimpleButton from "./SimpleButton";
import { useMediaQuery } from "react-responsive";

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
  const [expandedNavbar, setExpandedNavbar] = useState(false);
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const handleExpandNavbar = () => {
    setExpandedNavbar((previousExpandedNavbar) => !previousExpandedNavbar);
  };

  const navBarElements = (
    <nav id={"header-suffix"}>
      <ul>{suffix}</ul>
    </nav>
  );

  return (
    <Label
      width={width}
      // minHeight={height}
      height="auto"
    >
      <div className="header-container" style={{ height: `calc(${height} - ((var(--minecraftdepth) * 2)))` }}>
        {prefix && <div id="header-prefix">{prefix}</div>}
        <div id="header-expand-button">
          <SimpleButton height={"100%"} onTap={handleExpandNavbar}>
            <i className="material-icons">menu</i>
          </SimpleButton>
        </div>

        {!isSmallScreen ? navBarElements : <></>}
      </div>

      {expandedNavbar && isSmallScreen ? navBarElements : <></>}
    </Label>
  );
};

export default Header;
