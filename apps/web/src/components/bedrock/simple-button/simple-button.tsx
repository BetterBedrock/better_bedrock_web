import {
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { useSound } from "use-sound";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";

import { styles } from ".";
import clsx from "clsx";

type CommonProps = {
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onTap?: () => void;
  isClicked?: boolean;
  playSound?: boolean;
  tabIndex?: number;
  style?: CSSProperties;
  className?: string;
  transparent?: boolean;
};

// Extend native props based on target element
type ButtonOnlyProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type AnchorOnlyProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;
type SimpleButtonProps = ButtonOnlyProps | AnchorOnlyProps;

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

  const commonStyle = {
    height,
    width,
    ...style,
  };

  const commonClassName = clsx(styles.wrapper, transparent && styles.transparent, className);

  const child = <div className={styles.child}>{children}</div>;

  return (
    <button
      type="button"
      className={commonClassName}
      style={commonStyle}
      onClick={handleClick}
      tabIndex={tabIndex}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {child}
    </button>
  );
};
