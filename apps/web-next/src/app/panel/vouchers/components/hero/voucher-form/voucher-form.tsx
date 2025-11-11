"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { CardDivider } from "@/_components/card";
import { Popup } from "@/_components/popup";
import { VoucherDto, CreateVoucher } from "@/_lib/api";
import { useVoucherForm, VoucherFormField } from ".";

interface VoucherFormProps {
  voucher?: VoucherDto;
  onClose: () => void;
  onSubmit: (voucher: CreateVoucher) => void;
}

export const VoucherForm = ({
  onClose,
  voucher,
  onSubmit,
}: VoucherFormProps) => {
  const { onClickSubmit, fields, control, errors } = useVoucherForm({
    voucher,
    onSubmit,
  });

  return (
    <Popup
      title={voucher ? "Edit Voucher" : "Create Voucher"}
      onClose={onClose}
    >
      <Popup.Wrapper>
        <form onSubmit={onClickSubmit}>
          <Popup.Part>
            {fields.map(({ name, label, type, placeholder }) => (
              <VoucherFormField
                key={label}
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
