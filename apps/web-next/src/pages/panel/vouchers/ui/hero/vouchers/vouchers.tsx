"use client";

import { Banner } from "@/shared/ui/banner";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { VoucherForm } from "@/pages/panel/vouchers/ui/hero/voucher-form/voucher-form";
import { useVouchers } from "./use-vouchers";
import { VouchersAction } from "./vouchers-action";
import { VouchersList } from "./vouchers-list";

import styles from "./vouchers.module.scss";
import { Card, CardBody, CardDivider } from "@/shared/ui/card/card";

export const Vouchers = () => {
  const {
    voucher,
    handleSubmit,
    setOpen,
    open,
    vouchers,
    handleCreateVoucherClick,
    handlePreviewVoucher,
  } = useVouchers();

  return (
    <Card fullWidth>
      <CardBody>
        {open && (
          <VoucherForm
            key={voucher?.code ?? ""}
            voucher={voucher}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
        <VouchersAction handleCreateVoucherClick={handleCreateVoucherClick} />
      </CardBody>
      <CardDivider />
      <CardBody noPaddingBottom>
        {vouchers?.length === 0 && (
          <Banner message="No vouchers found" type="neutral" />
        )}
      </CardBody>
      <CardBody smallerGap>
        {vouchers ? (
          <VouchersList
            vouchers={vouchers}
            handlePreviewVoucher={handlePreviewVoucher}
          />
        ) : (
          <CircularProgressIndicator center />
        )}
      </CardBody>
    </Card>
  );
};
