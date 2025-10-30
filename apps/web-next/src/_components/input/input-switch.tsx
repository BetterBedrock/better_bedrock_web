"use client"

import { styles } from ".";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import useSound from "use-sound";

import ToggleOff from "@/public/ui/toggle/off.png";
import ToggleOffHover from "@/public/ui/toggle/off_hover.png";

import ToggleOn from "@/public/ui/toggle/on.png";
import ToggleOnHover from "@/public//ui/toggle/on_hover.png";

interface InputSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputSwitch = ({ checked, onChange, className, ...props }: InputSwitchProps) => {
  const [hover, setHover] = useState(false);
  const [playClickSound] = useSound("/sounds/minecraft_click.mp3", { volume: 0.25 });

  const handleClick = () => {
    playClickSound();
    if (onChange) {
      const event = {
        target: { checked: !checked, type: "checkbox", name: props.name },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleEnter = () => setHover(true);
  const handleLeave = () => setHover(false);

  let hovering = hover ? ToggleOffHover : ToggleOff;
  if (checked) {
    hovering = hover ? ToggleOnHover : ToggleOn;
  }

  return (
    <div
      className={clsx(className, styles.switch, checked && styles.on)}
      onClick={handleClick}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      {...props}
    >
      <img
        className={clsx(styles.image)}
        src={hovering.src}
        height="100%"
      />
    </div>
  );
};
