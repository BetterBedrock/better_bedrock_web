"use client"

import {
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
  Ref,
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
  navPaddings?: boolean;
};

type ButtonOnlyProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type AnchorOnlyProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;
type SimpleButtonProps = ButtonOnlyProps | AnchorOnlyProps;

export const SimpleButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SimpleButtonProps
>(
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
      navPaddings,
      ...props
    },
    ref
  ) => {
    const [clicked, setClicked] = useState<boolean>(isClicked ?? false);

    useEffect(() => {
      if (isClicked !== undefined) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setClicked(isClicked);
      }
    }, [isClicked]);

    const handleClick = () => {
      setClicked(true);
      if (onTap) onTap();
      setClicked(false);
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
      className
    );

    const child = (
      <div className={clsx(navPaddings && styles.childNav, styles.child, extraClassName && extraClassName)}>
        {children}
      </div>
    );

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
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
  }
);

SimpleButton.displayName = "SimpleButton";
