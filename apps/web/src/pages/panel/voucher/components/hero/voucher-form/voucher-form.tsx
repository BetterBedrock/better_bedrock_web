import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Input } from "~/components/bedrock/input";
import { Popup } from "~/components/bedrock/popup";
import { CreateVoucher, VoucherDto } from "~/lib/api";
import { styles } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { Button } from "~/components/bedrock/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { InputSwitch } from "~/components/bedrock/input/input-switch";
import dayjs from "dayjs";
import { INPUT_FORMAT } from "~/utils/date";

interface VoucherFormProps {
  open: boolean;
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: CreateVoucher) => void;
}
const schema = z.object({
  id: z.string().optional(),
  checkoutId: z.string().nullable().optional(),
  email: z.string().email(),
  code: z.string(),
  expiresAt: z.string(),
  createdAt: z.string().optional(),
  maxDownloads: z.coerce.number().min(0),
  downloadCount: z.coerce.number().min(0),
  betterBedrockContentOnly: z.boolean().default(false),
  blocked: z.boolean().default(false),
});

export const VoucherForm = ({ open, onClose, voucher, onSubmit }: VoucherFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: voucher,
    resolver: zodResolver(schema),
  });

  const onClickSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (voucher) {
      reset({
        ...voucher,
        expiresAt: dayjs(voucher.expiresAt).format(INPUT_FORMAT),
      });
    } else {
      reset({});
    }
  }, [voucher, reset]);

  useEffect(() => {
    console.log("Form errors:", errors);
  }, [errors]);

  const fields: Array<{
    name: keyof VoucherDto;
    label: string;
    type: string;
    placeholder: string;
  }> = [
    { name: "email", label: "Email", type: "email", placeholder: "Email" },
    { name: "code", label: "Code", type: "text", placeholder: "Code" },
    { name: "expiresAt", label: "Expires At", type: "datetime-local", placeholder: "Expires at" },
    { name: "maxDownloads", label: "Max downloads", type: "number", placeholder: "Max downloads" },
    {
      name: "downloadCount",
      label: "Downloads count",
      type: "number",
      placeholder: "Download count",
    },
    {
      name: "betterBedrockContentOnly",
      label: "Better bedrock content only",
      type: "checkbox",
      placeholder: "Better bedrock content only",
    },
    { name: "blocked", label: "Blocked", type: "checkbox", placeholder: "Blocked" },
  ];

  return (
    open && (
      <Popup title={voucher ? "Edit Voucher" : "Create Voucher"} onClose={onClose}>
        <form onSubmit={onClickSubmit} className={styles.form}>
          <div className={styles.part}>
            {fields.map(({ name, label, type, placeholder }) => (
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
            ))}
          </div>

          <CardDivider />
          <div className={styles.part}>
            <Button buttonType="submit" type="green" center>
              <BedrockText color="white" type="p" text="Confirm" />
            </Button>
          </div>
        </form>
      </Popup>
    )
  );
};
