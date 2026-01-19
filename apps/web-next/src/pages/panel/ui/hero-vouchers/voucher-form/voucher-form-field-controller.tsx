import { Control, Controller } from "react-hook-form";
import { InputSwitch } from "@/shared/ui/input";
import { Input } from "@/shared/ui/input";

import styles from "./voucher-form.module.scss";

interface VoucherFormFieldControllerProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  type: string;
  placeholder: string;
}

export const VoucherFormFieldController = ({
  name,
  control,
  type,
  placeholder,
}: VoucherFormFieldControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (
          type === "checkbox" &&
          (typeof field.value === "undefined" ||
            typeof field.value === "boolean")
        ) {
          return (
            <InputSwitch
              type="checkbox"
              className={styles.input}
              placeholder={placeholder}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
            />
          );
        }

        if (
          typeof field.value === "string" ||
          typeof field.value === "undefined" ||
          typeof field.value === "number"
        ) {
          return (
            <Input
              type={type}
              placeholder={placeholder}
              className={styles.input}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          );
        }

        return <></>;
      }}
    />
  );
};
