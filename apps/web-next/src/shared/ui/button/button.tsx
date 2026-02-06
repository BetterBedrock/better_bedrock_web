"use client";

import {
  HTMLAttributes,
  ReactNode,
  useState,
  forwardRef,
  MouseEvent,
} from "react";
import clsx from "clsx";
import useSound from "use-sound";

import styles from "./button.module.scss";
import { useImagePreload } from "@/shared/model";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";

export type ButtonType = "green" | "white" | "dark" | "gold" | "red";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  width?: string;
  height?: string;
  className?: string;
  children?: ReactNode;

  playSound?: boolean;
  center?: boolean;
  lockClicking?: boolean;
  isClicked?: boolean;
  summary?: boolean;
  isToggled?: boolean;
  buttonType?: "button" | "reset" | "submit" | undefined;
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLMapElement,
  ButtonProps
>(
  (
    {
      width,
      height,
      children,
      className,
      playSound = true,
      type = "green",
      center = false,
      lockClicking = false,
      isClicked,
      summary = false,
      buttonType,
      isToggled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isHeld, setIsHeld] = useState(false);

    const [playClickSound] = useSound("/sounds/minecraft_click.mp3", {
      volume: 0.25,
    });

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
      if (lockClicking || loading) return;

      setIsHeld(true);
      handleSetIsToggled(false);

      if (playSound) playClickSound();
      if (onClick) {
        setLoading(true);
        await onClick(e);
        setLoading(false);
      }
    };

    const handleSetIsToggled = (value: boolean) => {
      if (isClicked === true) return;
      setClicked(value);
    };

    const handlePointerDown = () => {
      if (lockClicking || loading) return;
      setIsHeld(true);
      setHover(true);
      handleSetIsToggled(!clicked);
    };

    const handleMouseUp = () => {
      if (lockClicking || loading) return;
      if (isHeld) setIsHeld(false);
    };

    const handleTouchEnd = () => {
      if (lockClicking || loading) return;
      setHover(false);

      if (isHeld) {
        setIsHeld(false);
        handleSetIsToggled(false);
      }
    };

    const handleLeave = () => {
      setHover(false);
      if (isHeld && !lockClicking && !loading) {
        setIsHeld(false);
        handleSetIsToggled(false);
      }
    };

    const handleEnter = () => setHover(true);

    let unchecked, uncheckedHover, checked, checkedHover, toggled;
    switch (type) {
      case "gold":
        unchecked = "/ui/buttons/gold/unchecked.png";
        uncheckedHover = "/ui/buttons/gold/unchecked_hover.png";
        checked = "/ui/buttons/gold/checked.png";
        checkedHover = "/ui/buttons/gold/checked_hover.png";
        toggled = "/ui/buttons/gold/default.png";
        break;
      case "red":
        unchecked = "/ui/buttons/red/unchecked.png";
        uncheckedHover = "/ui/buttons/red/unchecked_hover.png";
        checked = "/ui/buttons/red/checked.png";
        checkedHover = "/ui/buttons/red/checked_hover.png";
        toggled = "/ui/buttons/red/default.png";
        break;
      case "green":
        unchecked = "/ui/buttons/green/unchecked.png";
        uncheckedHover = "/ui/buttons/green/unchecked_hover.png";
        checked = "/ui/buttons/green/checked.png";
        checkedHover = "/ui/buttons/green/checked_hover.png";
        toggled = "/ui/buttons/green/default.png";
        break;
      case "dark":
        unchecked = "/ui/buttons/dark/unchecked.png";
        uncheckedHover = "/ui/buttons/dark/unchecked_hover.png";
        checked = "/ui/buttons/dark/checked.png";
        checkedHover = "/ui/buttons/dark/checked_hover.png";
        toggled = "/ui/buttons/dark/default.png";
        break;
      case "white":
      default:
        unchecked = "/ui/buttons/white/unchecked.png";
        uncheckedHover = "/ui/buttons/white/unchecked_hover.png";
        checked = "/ui/buttons/white/checked.png";
        checkedHover = "/ui/buttons/white/checked_hover.png";
        toggled = "/ui/buttons/white/default.png";
        break;
    }

    let hovering = hover ? uncheckedHover : unchecked;
    const finalClicked = isClicked !== undefined ? isClicked : clicked;
    if (finalClicked) {
      hovering = hover ? checkedHover : checked;
    }

    if (isToggled) {
      hovering = toggled;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = summary ? "summary" : "button";

    useImagePreload([
      unchecked,
      uncheckedHover,
      checked,
      checkedHover,
      toggled,
    ]);

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.wrapper,
          finalClicked && styles.selected,
          loading && styles.loading,
          className,
        )}
        onMouseEnter={handleEnter}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleLeave}
        onTouchMove={handleEnter}
        onBlur={handleLeave}
        onPointerLeave={handleLeave}
        onPointerUp={handleLeave}
        onPointerDown={handlePointerDown}
        style={{ width, height }}
        {...props}
        type={buttonType}
      >
        <div
          style={{ borderImage: `url(${hovering})` }}
          className={clsx(
            styles.button,
            finalClicked && styles.clicked,
            (center || loading) && styles.center,
            lockClicking && styles.lock,
          )}
        >
          {loading ? (
            <CircularProgressIndicator
              className={clsx(
                (type === "white" || type === "gold") && styles.indicator,
              )}
            />
          ) : (
            children
          )}
        </div>
      </Component>
    );
  },
);

Button.displayName = "Button";
