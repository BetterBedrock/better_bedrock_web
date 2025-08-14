import {
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
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

type ButtonOnlyProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type AnchorOnlyProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;
type SimpleButtonProps = ButtonOnlyProps | AnchorOnlyProps;

export const SimpleButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, SimpleButtonProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [clicked, setClicked] = useState<boolean>(isClicked ?? false);
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

    const commonClassName = clsx(styles.wrapper, transparent && styles.transparent, clicked && styles.active, className);

    const child = <div className={styles.child}>{children}</div>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
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
  },
);

SimpleButton.displayName = "SimpleButton";
