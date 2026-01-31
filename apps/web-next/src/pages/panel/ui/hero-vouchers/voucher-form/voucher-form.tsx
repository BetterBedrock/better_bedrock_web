"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Card, CardBody } from "@/shared/ui/card";
import { Popup } from "@/shared/ui/popup";
import { VoucherDto, CreateVoucher } from "@/shared/lib/openapi";
import { useVoucherForm } from "../../../model/use-voucher-form";
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
      <form onSubmit={onClickSubmit}>
        <Card negativeMarginBottom>
          <CardBody gapSize="lg">
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
          </CardBody>
        </Card>

        <Card sub >
          <CardBody gapSize="md">
            <Button buttonType="submit" type="green" center>
              <BedrockText color="white" type="p" text="Confirm" />
            </Button>
          </CardBody>
        </Card>
      </form>
    </Popup>
  );
};
