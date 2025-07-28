import { styles } from ".";
import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import bedrockClickSound from "~/assets/sounds/minecraft_click.mp3";
import useSound from "use-sound";

import ToggleOff from "~/assets/ui/toggle/off.png";
import ToggleOffHover from "~/assets/ui/toggle/off_hover.png";

import ToggleOn from "~/assets/ui/toggle/on.png";
import ToggleOnHover from "~/assets/ui/toggle/on_hover.png";

interface InputSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputSwitch = ({ value, onChange, className, ...props }: InputSwitchProps) => {
  console.log({ props });
  const [hover, setHover] = useState(false);
  const [playClickSound] = useSound(bedrockClickSound, { volume: 0.25 });

  const handleClick = () => {
    playClickSound();
    if (onChange) {
      // Create a synthetic event for react-hook-form
      const event = {
        target: { checked: !value, type: "checkbox", name: props.name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleEnter = () => setHover(true);
  const handleLeave = () => setHover(false);

  let hovering = hover ? ToggleOffHover : ToggleOff;
  if (value) {
    hovering = hover ? ToggleOnHover : ToggleOn;
  }

  return (
    <div
      className={clsx(className, styles.switch, value && styles.on)}
      onClick={handleClick}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      {...props}
    >
      <img
        className={clsx("noDrag", "noSelect", styles.image)}
        src={hovering}
        height="100%"
        width="100%"
      />
    </div>
  );
};
