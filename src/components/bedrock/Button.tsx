import React, { ReactNode, useState } from "react";
import "./Button.css";
import BedrockText from "./BedrockText";

interface ButtonProp {
  height?: number | string;
  width?: number | string;
  onTap?: () => void;
  type?: ButtonType;
  color?: ButtonColor;
  isClicked?: boolean;
}

enum ButtonType {
  default,
  alwaysGreen,
  alwaysWhite,
  alwaysBlack,
}

enum ButtonColor {
  green,
  white,
  black,
}

const Button: React.FC<ButtonProp> = ({ onTap, isClicked, type, height, width }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isHeld, setIsHeld] = useState(false);

  let color: ButtonColor | undefined;

  const handleMouseDown = () => {
    setIsHeld(true);
    handleSetIsToggled(!isToggled);
  };

  const handleMouseUp = () => {
    if (isHeld) {
      setIsHeld(false);
      //handleSetIsToggled(false);
    }
  };

  const handleMouseLeave = () => {
    if (isHeld) {
      setIsHeld(false);
      setIsToggled(false);
    }
  };

  const handleClick = async () => {
    if (isHeld && onTap) {
      onTap();
    }
  };

  switch (type) {
    case ButtonType.default:
      color = ButtonColor.white;
      if (isToggled) {
        color = ButtonColor.green;
      }
      break;
    case ButtonType.alwaysGreen:
      color = ButtonColor.green;
      break;
    case ButtonType.alwaysWhite:
      color = ButtonColor.white;
      break;
    case ButtonType.alwaysBlack:
      color = ButtonColor.black;
      break;
  }

  console.log(ButtonType[type!]);

  return (
    <div
      className="bedrock-button"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-toggled={isToggled ? "true" : "false"}
      data-type={ButtonType[type!]}
      data-color={ButtonColor[color!]}
      style={{ height: height, maxWidth: width }}
    >
      <div className="button-first-layer">
        <div className="button-second-layer">
          <div className="button-third-layer">
            <div className="button-fourth-layer">
              <div className="text non-selectable">
                <BedrockText text="Tet"/>
              </div>
            </div>
            <div className="button-fifth-layer" />
            <div className="button-sixth-layer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Button, ButtonType, ButtonColor };
