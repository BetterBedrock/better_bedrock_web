import { styles } from ".";
import { HTMLAttributes, ReactNode, useEffect, useState, forwardRef } from "react";
import clsx from "clsx";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";
import useSound from "use-sound";

import WhiteUnchecked from "~/assets/ui/buttons/white/unchecked.png";
import WhiteUncheckedHover from "~/assets/ui/buttons/white/unchecked_hover.png";
import WhiteChecked from "~/assets/ui/buttons/white/checked.png";
import WhiteCheckedHover from "~/assets/ui/buttons/white/checked_hover.png";

import GreenUnchecked from "~/assets/ui/buttons/green/unchecked.png";
import GreenUncheckedHover from "~/assets/ui/buttons/green/unchecked_hover.png";
import GreenChecked from "~/assets/ui/buttons/green/checked.png";
import GreenCheckedHover from "~/assets/ui/buttons/green/checked_hover.png";

import DarkUnchecked from "~/assets/ui/buttons/dark/unchecked.png";
import DarkUncheckedHover from "~/assets/ui/buttons/dark/unchecked_hover.png";
import DarkChecked from "~/assets/ui/buttons/dark/checked.png";
import DarkCheckedHover from "~/assets/ui/buttons/dark/checked_hover.png";

import GoldUnchecked from "~/assets/ui/buttons/gold/unchecked.png";
import GoldUncheckedHover from "~/assets/ui/buttons/gold/unchecked_hover.png";
import GoldChecked from "~/assets/ui/buttons/gold/checked.png";
import GoldCheckedHover from "~/assets/ui/buttons/gold/checked_hover.png";

import RedUnchecked from "~/assets/ui/buttons/red/unchecked.png";
import RedUncheckedHover from "~/assets/ui/buttons/red/unchecked_hover.png";
import RedChecked from "~/assets/ui/buttons/red/checked.png";
import RedCheckedHover from "~/assets/ui/buttons/red/checked_hover.png";

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
      onClick,
      ...props
    },
    ref,
  ) => {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [preload, setPreload] = useState(false);
    const [isHeld, setIsHeld] = useState(false);

    const [playClickSound] = useSound(bedrockClickSound, { volume: 0.25 });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (lockClicking) return;

      setIsHeld(true);
      handleSetIsToggled(false);

      if (playSound) playClickSound();
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

    let unchecked, uncheckedHover, checked, checkedHover;
    switch (type) {
      case "gold":
        unchecked = GoldUnchecked;
        uncheckedHover = GoldUncheckedHover;
        checked = GoldChecked;
        checkedHover = GoldCheckedHover;
        break;
      case "red":
        unchecked = RedUnchecked;
        uncheckedHover = RedUncheckedHover;
        checked = RedChecked;
        checkedHover = RedCheckedHover;
        break;
      case "green":
        unchecked = GreenUnchecked;
        uncheckedHover = GreenUncheckedHover;
        checked = GreenChecked;
        checkedHover = GreenCheckedHover;
        break;
      case "dark":
        unchecked = DarkUnchecked;
        uncheckedHover = DarkUncheckedHover;
        checked = DarkChecked;
        checkedHover = DarkCheckedHover;
        break;
      case "white":
      default:
        unchecked = WhiteUnchecked;
        uncheckedHover = WhiteUncheckedHover;
        checked = WhiteChecked;
        checkedHover = WhiteCheckedHover;
        break;
    }

    let hovering = hover ? uncheckedHover : unchecked;
    const finalClicked = isClicked !== undefined ? isClicked : clicked;
    if (finalClicked) {
      hovering = hover ? checkedHover : checked;
    }

    useEffect(() => {
      if (preload) return;

      const images = [unchecked, uncheckedHover, checked, checkedHover];
      const imageRefs = images.map((src) => {
        const img = new window.Image();
        img.src = src;
        return img;
      });

      setPreload(true);

      return () => {
        imageRefs.forEach((img) => (img.src = ""));
      };
    }, [unchecked, uncheckedHover, checked, checkedHover, preload]);

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
          style={{ borderImage: `url(${hovering})` }}
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
