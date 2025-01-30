import { useState, useEffect, ReactNode } from "react";
import { useSound } from "use-sound";
import bedrockClickSound from "assets/sounds/minecraft_click.mp3";

import styles from "./simple-button.module.css";
import clsx from "clsx";

interface SimpleButtonProps {
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onTap?: () => void;
  isClicked?: boolean;
  playSound?: boolean;
  tabIndex?: number;
}

const SimpleButton = ({
  height,
  width,
  children,
  onTap,
  isClicked,
  playSound = false,
  tabIndex,
}: SimpleButtonProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [playClickSound] = useSound(bedrockClickSound);

  useEffect(() => {
    if (isClicked !== undefined) {
      setClicked(isClicked);
    }
  }, [isClicked]);

  const handleClick = () => {
    // if (clicked) return;

    setClicked(true);
    if (playSound) playClickSound();
    if (onTap) onTap();
  };

  return (
    <button
      className={styles.wrapper}
      style={{ height, width }}
      onClick={handleClick}
      tabIndex={tabIndex}
    >
      <div className={styles.child}>{children}</div>
    </button>
  );
};

export default SimpleButton;
