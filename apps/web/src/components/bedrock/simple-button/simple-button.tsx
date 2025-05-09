import { useState, useEffect, ReactNode } from "react";
import { useSound } from "use-sound";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";

import { styles } from ".";
import clsx from "clsx";

interface SimpleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onTap?: () => void;
  isClicked?: boolean;
  playSound?: boolean;
  tabIndex?: number;
  style?: React.CSSProperties;
  className?: string;
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
  className,
  ...props
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
      className={clsx(styles.wrapper, className && className)}
      onClick={handleClick}
      tabIndex={tabIndex}
      {...props}
    >
      <div className={styles.child}>{children}</div>
    </button>
  );
};

export default SimpleButton;
