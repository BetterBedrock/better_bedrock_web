import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import styles from "./input.module.scss";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  sub?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = "Enter text", value, onChange, className, sub, ...props },
    ref
  ) => (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={clsx(styles.input, sub && styles.sub, className)}
      placeholder={placeholder}
      {...props}
    />
  )
);

Input.displayName = "Input";
