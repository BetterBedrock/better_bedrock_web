import { Control, FieldErrors } from "react-hook-form";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { VoucherDto } from "@/shared/lib/openapi";
import { VoucherFormFieldController } from "./voucher-form-field-controller";
import { VoucherFormError } from "./voucher-form-error";

import styles from "./voucher-form.module.scss";

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
    <VoucherFormFieldController
      name={name}
      type={type}
      control={control}
      placeholder={placeholder}
    />

    {errors[name] && (
      <VoucherFormError message={errors[name]?.message as string} />
    )}
  </div>
);
