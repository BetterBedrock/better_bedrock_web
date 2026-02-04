"use client";

import { Banner } from "@/shared/ui/banner";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { VoucherForm } from "../voucher-form/voucher-form";
import { useVouchers } from "./use-vouchers";
import { VouchersAction } from "./vouchers-action";
import { VouchersList } from "./vouchers-list";
import { Card } from "@/shared/ui/card";

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
      <Card.Body>
        {open && (
          <VoucherForm
            key={voucher?.code ?? ""}
            voucher={voucher}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
        <VouchersAction handleCreateVoucherClick={handleCreateVoucherClick} />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        {vouchers?.length === 0 && (
          <Banner message="No vouchers found." type="neutral" />
        )}
        {vouchers ? (
          <VouchersList
            vouchers={vouchers}
            handlePreviewVoucher={handlePreviewVoucher}
          />
        ) : (
          <CircularProgressIndicator center />
        )}
      </Card.Body>
    </Card>
  );
};
