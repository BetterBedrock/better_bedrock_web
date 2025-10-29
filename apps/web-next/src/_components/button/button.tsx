"use client"

import { styles } from ".";
import { HTMLAttributes, ReactNode, useEffect, useState, forwardRef, MouseEvent } from "react";
import clsx from "clsx";
// import bedrockClickSound from "@/public/sounds/minecraft_click.mp3";

import WhiteUnchecked from "@/public/ui/buttons/white/unchecked.png";
import WhiteUncheckedHover from "@/public/ui/buttons/white/unchecked_hover.png";
import WhiteChecked from "@/public/ui/buttons/white/checked.png";
import WhiteCheckedHover from "@/public/ui/buttons/white/checked_hover.png";
import WhiteCheckedDefault from "@/public/ui/buttons/white/default.png";

import GreenUnchecked from "@/public/ui/buttons/green/unchecked.png";
import GreenUncheckedHover from "@/public/ui/buttons/green/unchecked_hover.png";
import GreenChecked from "@/public/ui/buttons/green/checked.png";
import GreenCheckedHover from "@/public/ui/buttons/green/checked_hover.png";
import GreenCheckedDefault from "@/public/ui/buttons/green/default.png";

import DarkUnchecked from "@/public/ui/buttons/dark/unchecked.png";
import DarkUncheckedHover from "@/public/ui/buttons/dark/unchecked_hover.png";
import DarkChecked from "@/public/ui/buttons/dark/checked.png";
import DarkCheckedHover from "@/public/ui/buttons/dark/checked_hover.png";
import DarkCheckedDefault from "@/public/ui/buttons/dark/default.png";

import GoldUnchecked from "@/public/ui/buttons/gold/unchecked.png";
import GoldUncheckedHover from "@/public/ui/buttons/gold/unchecked_hover.png";
import GoldChecked from "@/public/ui/buttons/gold/checked.png";
import GoldCheckedHover from "@/public/ui/buttons/gold/checked_hover.png";
import GoldCheckedDefault from "@/public/ui/buttons/gold/default.png";

import RedUnchecked from "@/public/ui/buttons/red/unchecked.png";
import RedUncheckedHover from "@/public/ui/buttons/red/unchecked_hover.png";
import RedChecked from "@/public/ui/buttons/red/checked.png";
import RedCheckedHover from "@/public/ui/buttons/red/checked_hover.png";
import RedCheckedDefault from "@/public/ui/buttons/red/default.png";
import useSound from "use-sound";

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

export const Button = forwardRef<HTMLButtonElement | HTMLMapElement, ButtonProps>(
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
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [preload, setPreload] = useState(false);
    const [isHeld, setIsHeld] = useState(false);

    // const [playClickSound] = useSound(bedrockClickSound, { volume: 0.25 });

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (lockClicking) return;

      setIsHeld(true);
      handleSetIsToggled(false);

      // if (playSound) playClickSound();
      if (onClick) onClick(e);
    };

    const handleSetIsToggled = (value: boolean) => {
      if (isClicked === true) return;
      setClicked(value);
    };

    const handlePointerDown = () => {
      if (lockClicking) return;
      setIsHeld(true);
      setHover(true);
      handleSetIsToggled(!clicked);
    };

    const handleMouseUp = () => {
      if (lockClicking) return;
      if (isHeld) setIsHeld(false);
    };

    const handleTouchEnd = () => {
      if (lockClicking) return;
      setHover(false);

      if (isHeld) {
        setIsHeld(false);
        handleSetIsToggled(false);
      }
    };

    const handleLeave = () => {
      setHover(false);
      if (isHeld && !lockClicking) {
        setIsHeld(false);
        handleSetIsToggled(false);
      }
    };

    const handleEnter = () => setHover(true);

    let unchecked, uncheckedHover, checked, checkedHover, toggled;
    switch (type) {
      case "gold":
        unchecked = GoldUnchecked;
        uncheckedHover = GoldUncheckedHover;
        checked = GoldChecked;
        checkedHover = GoldCheckedHover;
        toggled = GoldCheckedDefault;
        break;
      case "red":
        unchecked = RedUnchecked;
        uncheckedHover = RedUncheckedHover;
        checked = RedChecked;
        checkedHover = RedCheckedHover;
        toggled = RedCheckedDefault;
        break;
      case "green":
        unchecked = GreenUnchecked;
        uncheckedHover = GreenUncheckedHover;
        checked = GreenChecked;
        checkedHover = GreenCheckedHover;
        toggled = GreenCheckedDefault;
        break;
      case "dark":
        unchecked = DarkUnchecked;
        uncheckedHover = DarkUncheckedHover;
        checked = DarkChecked;
        checkedHover = DarkCheckedHover;
        toggled = DarkCheckedDefault;
        break;
      case "white":
      default:
        unchecked = WhiteUnchecked;
        uncheckedHover = WhiteUncheckedHover;
        checked = WhiteChecked;
        checkedHover = WhiteCheckedHover;
        toggled = WhiteCheckedDefault;
        break;
    }

    let hovering = hover ? uncheckedHover : unchecked;
    const finalClicked = isClicked !== undefined ? isClicked : clicked;
    if (finalClicked) {
      hovering = hover ? checkedHover : checked;
    }

    if (isToggled) {
      hovering = toggled;
      // finalClicked = toggled;
    }

    useEffect(() => {
      if (preload) return;

      const images = [unchecked, uncheckedHover, checked, checkedHover];
      const imageRefs = images.map((src) => {
        const img = new window.Image();
        img.src = src.src;
        return img;
      });

      setPreload(true);

      return () => {
        imageRefs.forEach((img) => (img.src = ""));
      };
    }, [unchecked, uncheckedHover, checked, checkedHover, toggled, preload]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = summary ? "summary" : "button";

    return (
      <Component
        ref={ref}
        className={clsx(styles.wrapper, finalClicked && styles.selected, className)}
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
          style={{ borderImage: `url(${hovering.src})` }}
          className={clsx(
            styles.button,
            finalClicked && styles.clicked,
            center && styles.center,
            lockClicking && styles.lock,
          )}
        >
          {children}
        </div>
      </Component>
    );
  },
);

Button.displayName = "Button";