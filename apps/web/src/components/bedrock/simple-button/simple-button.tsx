import { useState, useEffect, ReactNode, HTMLAttributes } from "react";
import { useSound } from "use-sound";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";

import { styles } from ".";
import clsx from "clsx";

interface SimpleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onTap?: () => void;
  isClicked?: boolean;
  playSound?: boolean;
  tabIndex?: number;
  style?: React.CSSProperties;
  className?: string;
  transparent?: boolean;
}

export const SimpleButton = ({
  height,
  width,
  children,
  onTap,
  isClicked,
  playSound = false,
  tabIndex,
  transparent = false,
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
    setClicked(true);
    if (playSound) playClickSound();
    if (onTap) onTap();
  };

  return (
    <button
      style={{ height, width, ...style }}
      className={clsx(styles.wrapper, transparent && styles.transparent, className && className)}
      onClick={handleClick}
      tabIndex={tabIndex}
      {...props}
    >
      <div className={styles.child}>{children}</div>
    </button>
  );
};