import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Input } from "~/components/bedrock/input";
import { Popup } from "~/components/bedrock/popup";
import { VoucherDto } from "~/lib/api";
import { styles } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { Button } from "~/components/bedrock/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface VoucherFormProps {
  open: boolean;
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: VoucherDto) => void;
}
const schema = z.object({
  id: z.string(),
  checkoutId: z.string().nullable().optional(),
  email: z.string().email(),
  code: z.string(),
  expiresAt: z.string(),
  createdAt: z.string(),
  maxDownloads: z.number().min(0),
  downloadCount: z.number().min(0),
  betterBedrockContentOnly: z.boolean().default(false),
  blocked: z.boolean().default(false),
});

export const VoucherForm = ({ open, onClose, voucher, onSubmit }: VoucherFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: voucher,
    resolver: zodResolver(schema),
  });

  const onClickSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    reset(voucher || {});
  }, [voucher, reset]);

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
            {fields.map((field) => (
              <div className={styles.field} key={field.name}>
                <BedrockText textAlign="start" text={field.label} type="p" color="white" />
                <Input
                  className={styles.input}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, field.type === "number" ? { valueAsNumber: true } : {})}
                />
                {errors[field.name] && (
                  <BedrockText
                    type="p2"
                    extraClassName={styles.error}
                    text={errors[field.name]?.message as string}
                    textAlign="start"
                  />
                )}
              </div>
            ))}
          </div>

          <CardDivider />
          <div className={styles.part}>
            <Button type="green" onClick={onClickSubmit} center>
              <BedrockText color="white" type="p" text="Confirm" />
            </Button>
          </div>
        </form>
      </Popup>
    )
  );
};
