"use client";

import { Banner } from "@/_components/banner";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { VoucherForm } from "@/app/panel/vouchers/components/hero/voucher-form";
import { styles, useVouchers, VouchersAction, VouchersList } from ".";

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
    <div className={styles.list}>
      {open && (
        <VoucherForm
          key={voucher?.code ?? ""}
          voucher={voucher}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
      <VouchersAction handleCreateVoucherClick={handleCreateVoucherClick} />
      {vouchers?.length === 0 && (
        <Banner message="No vouchers found" type="neutral" />
      )}
      {vouchers ? (
        <VouchersList
          vouchers={vouchers}
          handlePreviewVoucher={handlePreviewVoucher}
        />
      ) : (
        <CircularProgressIndicator center />
      )}
    </div>
  );
};
