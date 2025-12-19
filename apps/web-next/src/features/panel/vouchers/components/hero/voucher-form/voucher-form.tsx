"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { CardDivider } from "@/components/card";
import { Popup } from "@/components/popup";
import { VoucherDto, CreateVoucher } from "@/lib/api";
import { useVoucherForm } from "../../../hooks/use-voucher-form";
import { VoucherFormField } from "./voucher-form-field";

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
