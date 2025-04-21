import { useState, useEffect, ReactNode } from "react";
import { useSound } from "use-sound";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";

import { styles } from ".";

interface SimpleButtonProps {
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onTap?: () => void;
  isClicked?: boolean;
  playSound?: boolean;
  tabIndex?: number;
  style?: React.CSSProperties;
}

const SimpleButton = ({
  height,
  width,
  children,
  onTap,
  isClicked,
  playSound = false,
  tabIndex,
  style,
}: SimpleButtonProps) => {
  const [_, setClicked] = useState<boolean>(false);
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
      style={{ height, width, ...style }}
      className={styles.wrapper}
      onClick={handleClick}
      tabIndex={tabIndex}
    >
      <div className={styles.child}>{children}</div>
    </button>
  );
};

export default SimpleButton;
