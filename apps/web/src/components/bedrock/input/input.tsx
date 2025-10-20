import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import { styles } from ".";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "Enter text",
      value,
      onChange,
      className,
      ...props
    },
    ref
  ) => (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={clsx(styles.input, className)}
      placeholder={placeholder}
      {...props}
    />
  )
);