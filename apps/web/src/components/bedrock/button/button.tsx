import { HTMLAttributes, ReactNode, useState } from "react";

import { BedrockText } from "~/components/bedrock/bedrock-text";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";
import useSound from "use-sound";

import styles from "./button.module.css";
import clsx from "clsx";

export type ButtonType = "alwaysGreen" | "alwaysWhite" | "alwaysBlack";

interface ButtonProp extends HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  textPadding?: number | string;
  width?: number | string;
  onTap?: () => void;
  onChangeStateHandler?: (value: boolean) => void;
  type?: ButtonType;
  isClicked?: boolean;
  setInitialClickedState?: boolean;
  playSound?: boolean;
  textType?: "h1" | "h2" | "h3" | "p" | "p2";
  text?: string;
  outlinePaddingLeft?: string;
  outlinePaddingRight?: string;
  tabIndex?: number;
  children?: ReactNode;
  style?: React.CSSProperties;
  lockClicking?: boolean;
  className?: string;
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
  lockClicking = false,

  className,

  ...props
}: ButtonProp) => {
  const [isToggled, setIsToggled] = useState(setInitialClickedState);
  const [isHeld, setIsHeld] = useState(false);
  const [playClickSound] = useSound(bedrockClickSound, { volume: 0.25 });

  const onClick = async () => {
    handleMouseDown();
    if (playSound) playClickSound();
    if (onTap) {
      onTap();
    }
  };

  const handleSetIsToggled = (value: boolean) => {
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

  const toggledState = isClicked !== undefined ? isClicked : isToggled;

  return (
    <div style={{ height: height, width: width, ...style }} className={clsx(styles.buttonContainer, className)} {...props}>
      <button
        className={clsx(styles.button, lockClicking && styles.lock)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        data-toggled={toggledState}
        data-type={type}
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
                <div className={styles.text} style={{ padding: textPadding }}>
                  {text && (
                    <BedrockText
                      selectable={false}
                      type={textType ?? "p"}
                      text={text}
                      style={{ padding: "0.5rem 1rem" }}
                    />
                  )}
                  {children && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {children}
                    </div>
                  )}
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
