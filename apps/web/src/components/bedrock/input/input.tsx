import { InputHTMLAttributes } from "react";
import { styles } from ".";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({ placeholder = "Enter text", value, onChange, className, ...props }: InputProps) => (
  <input
    value={value}
    onChange={onChange}
    type="text"
    className={clsx(styles.input, className && className)}
    placeholder={placeholder}
    {...props}
  />
);
