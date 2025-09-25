import {
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
} from "react";

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
  extraClassName?: string;
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
      tabIndex,
      transparent = false,
      style,
      className,
      extraClassName,
      ...props
    },
    ref,
  ) => {
    const [clicked, setClicked] = useState<boolean>(isClicked ?? false);

    useEffect(() => {
      if (isClicked !== undefined) {
        setClicked(isClicked);
      }
    }, [isClicked]);

    const handleClick = () => {
      setClicked(true);
      if (onTap) onTap();
    };

    const commonStyle = {
      height,
      width,
      ...style,
    };

    const commonClassName = clsx(
      styles.wrapper,
      transparent && styles.transparent,
      clicked && styles.active,
      className,
    );

    const child = (
      <div className={clsx(styles.child, extraClassName && extraClassName)}>{children}</div>
    );

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
