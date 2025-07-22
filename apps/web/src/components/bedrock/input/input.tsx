import { InputHTMLAttributes } from "react";
import { styles } from ".";
import clsx from "clsx";
import { InputSwitch } from "~/components/bedrock/input/input-switch";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({
  placeholder = "Enter text",
  value,
  onChange,
  className,
  ...props
}: InputProps) => {
  if (props.type === "checkbox") {
    return <InputSwitch value={value} onChange={onChange} className={className} {...props} />;
  }

  return <input
    value={value}
    onChange={onChange}
    className={clsx(styles.input, className && className)}
    placeholder={placeholder}
    {...props}
  />;
};
