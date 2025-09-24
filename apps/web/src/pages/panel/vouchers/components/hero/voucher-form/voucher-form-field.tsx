import { Control, Controller, FieldErrors } from "react-hook-form";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Input } from "~/components/bedrock/input";
import { InputSwitch } from "~/components/bedrock/input/input-switch";
import { styles } from ".";
import { VoucherDto } from "~/lib/api";

interface VoucherFormFieldProps {
  name: keyof VoucherDto;
  label: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors<VoucherDto>;
}

export const VoucherFormField = ({
  name,
  label,
  type,
  placeholder,
  control,
  errors,
}: VoucherFormFieldProps) => (
  <div className={styles.field} key={name}>
    <BedrockText textAlign="start" text={label} type="p" color="white" />
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (
          type === "checkbox" &&
          (typeof field.value === "undefined" || typeof field.value === "boolean")
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

    {errors[name] && (
      <BedrockText
        type="p2"
        extraClassName={styles.error}
        text={errors[name]?.message as string}
        textAlign="start"
      />
    )}
  </div>
);
