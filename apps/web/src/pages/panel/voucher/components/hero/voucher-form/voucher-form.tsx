import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";
import { Popup } from "~/components/bedrock/popup";
import { VoucherDto } from "~/lib/api";
import { styles } from ".";
import { CardDivider } from "~/components/bedrock/card";

interface VoucherFormProps {
  open: boolean;
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: VoucherDto) => void;
}

export const VoucherForm = ({ open, onClose, voucher, onSubmit }: VoucherFormProps) => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: voucher || {} });

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
              </div>
            ))}
          </div>
          <CardDivider />
          <div className={styles.part}>
            <Button text="Confirm" type="alwaysGreen" onClick={onClickSubmit} />
          </div>
        </form>
      </Popup>
    )
  );
};
