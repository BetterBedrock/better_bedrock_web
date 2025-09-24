import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Popup } from "~/components/bedrock/popup";
import { CreateVoucher, VoucherDto } from "~/lib/api";
import { useVoucherForm } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { Button } from "~/components/bedrock/button";
import { VoucherFormField } from "~/pages/panel/vouchers/components/hero/voucher-form/voucher-form-field";

interface VoucherFormProps {
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: CreateVoucher) => void;
}

export const VoucherForm = ({ onClose, voucher, onSubmit }: VoucherFormProps) => {
  const { onClickSubmit, fields, control, errors } = useVoucherForm({ voucher, onSubmit });

  return (
    <Popup title={voucher ? "Edit Voucher" : "Create Voucher"} onClose={onClose}>
      <Popup.Wrapper>
        <form onSubmit={onClickSubmit}>
          <Popup.Part>
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
          </Popup.Part>

          <CardDivider />
          <Popup.Part>
            <Button buttonType="submit" type="green" center>
              <BedrockText color="white" type="p" text="Confirm" />
            </Button>
          </Popup.Part>
        </form>
      </Popup.Wrapper>
    </Popup>
  );
};
