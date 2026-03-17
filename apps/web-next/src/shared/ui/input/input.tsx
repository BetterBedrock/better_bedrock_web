import React, {
  useState,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
} from "react";
import styles from "./input.module.scss";
import clsx from "clsx";

import useSound from "use-sound";
import Image from "next/image";

interface InputSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  sub?: boolean;
}

type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Switch: React.FC<InputSwitchProps>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = "Enter text", value, onChange, className, sub, ...props },
    ref,
  ) => (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={clsx(styles.input, sub && styles.sub, className)}
      placeholder={placeholder}
      {...props}
    />
  ),
) as InputComponent;

const InputSwitch = ({
  checked,
  onChange,
  className,
  ...props
}: InputSwitchProps) => {
  const [toggled, setToggled] = useState(checked);

  useEffect(() => {
    setToggled(checked);
  }, [checked]);

  const [hover, setHover] = useState(false);
  const [playClickSound] = useSound("/sounds/minecraft_click.mp3", {
    volume: 0.25,
  });

  const handleClick = () => {
    playClickSound();
    if (onChange) {
      const event = {
        target: { checked: !toggled, type: "checkbox", name: props.name },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    setToggled((prev) => !prev);
  };

  const handleEnter = () => setHover(true);
  const handleLeave = () => setHover(false);

  let hovering = hover
    ? "public/ui/toggle/off_hover.png"
    : "public/ui/toggle/off.png";
  if (toggled) {
    hovering = hover
      ? "public/ui/toggle/on_hover.png"
      : "public/ui/toggle/on.png";
  }

  return (
    <div
      className={clsx(className, styles.switch, toggled && styles.on)}
      onClick={handleClick}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      {...props}
    >
      <Image
        alt="Switch"
        className={clsx(styles.image)}
        src={hovering}
        height={40}
        width={72}
        unoptimized
      />
    </div>
  );
};

Input.Switch = InputSwitch;

Input.displayName = "Input";
Input.Switch.displayName = "Input.Switch";
