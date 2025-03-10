import { ReactNode, useRef, useState, useEffect } from "react";

import { BedrockText } from "components/bedrock/text/bedrock-text";
import bedrockClickSound from "assets/sounds/minecraft_click.mp3";
import useSound from "use-sound";

import styles from "./button.module.css";

export type ButtonType = "alwaysGreen" | "alwaysWhite" | "alwaysBlack";

interface ButtonProp {
  height?: number | string;
  textPadding?: number | string;
  width?: number | string;
  onTap?: (...args: any[]) => void;
  onChangeStateHandler?: (value: boolean) => void;
  type?: ButtonType;
  isClicked?: boolean;
  setInitialClickedState?: boolean;
  playSound?: boolean;
  textType?: "h1" | "h2" | "h3" | "p" | "p2";
  text: string;
  outlinePaddingLeft?: string;
  outlinePaddingRight?: string;
  tabIndex?: number;
  children?: ReactNode;
  style?: React.CSSProperties
  lockClicking?: boolean
}

const Button = ({
  onTap,
  isClicked,
  onChangeStateHandler,
  setInitialClickedState = false,
  
  text,
  textType,
  type,
  height = "100%",
  textPadding,
  width,
  outlinePaddingLeft = "var(--minecraftdepth)",
  outlinePaddingRight = "var(--minecraftdepth)",
  tabIndex,
  children,
  style,
  
  playSound = true,
  lockClicking = false 

}: ButtonProp) => {
  const [isToggled, setIsToggled] = useState(setInitialClickedState);
  const [isHeld, setIsHeld] = useState(false);
  const [playClickSound] = useSound(bedrockClickSound);

  const onClick = async () => {
    handleMouseDown();
    if (playSound) playClickSound();
    if (onTap) {
      onTap();
    }
  };

  const handleSetIsToggled = (value: boolean) => {
    // was (isClicked !== undefined) but changed due collapsible component to prevent unchecking when collapsible is open and usefeect from bottom
    if (isClicked === true) {
      return;
    }

    if (onChangeStateHandler) onChangeStateHandler(value);
    setIsToggled(value);
  };


  const handleMouseDown = () => {
    if (lockClicking) return;
    setIsHeld(true);
    handleSetIsToggled(!isToggled);
  };

  const handleMouseUp = () => {
    if (isHeld) {
      setIsHeld(false);
    }
  };

  const handleMouseLeave = () => {
    if (isHeld) {
      setIsHeld(false);
      handleSetIsToggled(false);
    }
  };

  // useEffect(() => {
  //   if (isClicked !== undefined) {
  //     setIsToggled(isClicked);
  //   }
  // }, [isClicked]);

  //alternative for useEffect that triggers unnecessary and buggy re-render
  const toggledState = isClicked !== undefined ? isClicked : isToggled;

  return (
    <div style={{ height: height, width: width, ...style, }} className={styles.buttonContainer}>
      <button
        className={styles.button}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        // data-toggled={isToggled ? "true" : "false"}
        data-toggled={toggledState}
        data-type={type}
        tabIndex={tabIndex}
      >
        <div
          className={styles.first_layer}
          style={{
            borderLeftWidth: outlinePaddingLeft,
            borderRightWidth: outlinePaddingRight,
          }}>
          <div className={styles.second_layer}>
            <div className={styles.third_layer}>
              <div className={styles.fourth_layer}>

                <div className={styles.text} style={{ padding: textPadding }}>
                  {text && <BedrockText
                    selectable={false}
                    type={textType ?? "p"}
                    text={text}
                    style={{ padding: "0.5rem" }}
                  />}
                  {children && (
                    <div style={{ display: "flex", alignItems: "flex-start", width: "100%", height: "100%" }}>
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
    </div>
  );
};

export { Button };
