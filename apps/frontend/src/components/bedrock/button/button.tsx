import { ReactNode, useRef, useState } from "react";

import { BedrockText } from "components/bedrock/text/bedrock-text";
import bedrockClickSound from "assets/sounds/minecraft_click.mp3";
import useSound from "use-sound";

import styles from "./button.module.css";

export type ButtonType = "alwaysGreen" | "alwaysWhite" | "alwaysBlack";

interface ButtonProp {
  height?: number | string;
  width?: number | string;
  onTap?: () => void;
  onChangeStateHandler?: (value: boolean) => void;
  type?: ButtonType;
  isClicked?: boolean;
  setClickedState?: boolean;
  playSound?: boolean;
  textType?: "h1" | "h2" | "h3" | "p" | "p2";
  text: string;
  outlinePaddingLeft?: string;
  outlinePaddingRight?: string;
  tabIndex?: number;
  children?: ReactNode;
  style?: React.CSSProperties
}

const Button = ({
  onTap,
  isClicked,
  type,
  height,
  width,
  playSound = true,
  textType,
  text,
  onChangeStateHandler,
  setClickedState = false,
  outlinePaddingLeft = "var(--minecraftdepth)",
  outlinePaddingRight = "var(--minecraftdepth)",
  tabIndex,
  children,
  style
}: ButtonProp) => {
  const [isToggled, setIsToggled] = useState(setClickedState);
  const [isHeld, setIsHeld] = useState(false);
  const [playClickSound] = useSound(bedrockClickSound);

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

  const handleClick = async () => {
    handleMouseDown();
    if (playSound) playClickSound();
    if (onTap) {
      onTap();
    }
  };

  return (
    <button
      className={styles.wrapper}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-toggled={isToggled ? "true" : "false"}
      data-type={type}
      style={{ height: height, width: width, maxWidth: width, ...style }}
      tabIndex={tabIndex}
    >
      <div
        className={styles.first_layer}
        style={{
          borderLeftWidth: outlinePaddingLeft,
          borderRightWidth: outlinePaddingRight,
        }}
      >
        <div className={styles.second_layer}>
          <div className={styles.third_layer}>
            <div className={styles.fourth_layer}>
              <div className={styles.text}>
                <BedrockText
                  selectable={false}
                  type={textType ?? "p"}
                  text={text}
                />
                {children && (<div style={{ display: "flex", alignItems: "flex-start", width: "100%", height: "100%" }}>
                  {children}
                </div>)}
              </div>
            </div>
            <div className={styles.fifth_layer} />
            <div className={styles.sixth_layer} />
          </div>
        </div>
      </div>
    </button>
  );
};

export { Button };
