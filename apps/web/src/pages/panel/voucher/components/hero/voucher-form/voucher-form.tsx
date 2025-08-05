import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Popup } from "~/components/bedrock/popup";
import { CreateVoucher, VoucherDto } from "~/lib/api";
import { styles, useVoucherForm } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { Button } from "~/components/bedrock/button";
import { VoucherFormField } from "~/pages/panel/voucher/components/hero/voucher-form/voucher-form-field";

interface VoucherFormProps {
  open: boolean;
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: CreateVoucher) => void;
}

export const VoucherForm = ({ open, onClose, voucher, onSubmit }: VoucherFormProps) => {
  const { onClickSubmit, fields, control, errors } = useVoucherForm({ voucher, onSubmit });

  return (
    open && (
      <Popup title={voucher ? "Edit Voucher" : "Create Voucher"} onClose={onClose}>
        <form onSubmit={onClickSubmit} className={styles.form}>
          <div className={styles.part}>
            {fields.map(({ name, label, type, placeholder }) => (
              <VoucherFormField
                errors={errors}
                control={control}
                name={name}
                label={label}
                type={type}
                placeholder={placeholder}
              />
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
