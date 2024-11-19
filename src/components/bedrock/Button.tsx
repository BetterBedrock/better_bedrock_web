import React, { ReactNode, useState } from "react";
import "./Button.css";
import { BedrockText, BedrockTextType } from "./BedrockText";
import useAudio from "../../utils/SoundManager";
import bedrockClickSound from "../../assets/sounds/minecraft_click.mp3";

interface ButtonProp {
  height?: number | string;
  width?: number | string;
  onTap?: () => void;
  onChangeStateHandler?: (value: boolean) => void;
  type?: ButtonType;
  color?: ButtonColor;
  toggleButton?: boolean;
  isClicked?: boolean;
  setClickedState?: boolean;
  playSound?: boolean;
  textType?: BedrockTextType;
  text: string;
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

const Button: React.FC<ButtonProp> = ({
  onTap,
  isClicked,
  type,
  height,
  width,
  toggleButton,
  playSound = false,
  textType,
  text,
  onChangeStateHandler,
  setClickedState = false,
}) => {
  const [isToggled, setIsToggled] = useState(setClickedState);
  const [isHeld, setIsHeld] = useState(false);

  let color: ButtonColor | undefined;

  if (isClicked) setIsToggled(isClicked);

  const handleSetIsToggled = (value: boolean) => {
    if (isClicked !== undefined) {
      return;
    }

    if (onChangeStateHandler) onChangeStateHandler(value);
    setIsToggled(value);
  };

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
      handleSetIsToggled(false);
    }
  };
  let audio = new Audio(bedrockClickSound);

  const handleClick = async () => {
    if (playSound) audio.play();
    if (onTap) {
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
              <div className="button-text">
                <BedrockText
                  selectable={false}
                  type={textType ?? BedrockTextType.p1}
                  text={text}
                />
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
