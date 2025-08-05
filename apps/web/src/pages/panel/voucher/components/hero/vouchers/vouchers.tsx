import { styles, useVouchers, VouchersAction, VouchersList } from ".";
import { VoucherForm } from "~/pages/panel/voucher/components/hero/voucher-form";

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
      <VoucherForm
        key={voucher?.code ?? ""}
        open={open}
        voucher={voucher}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
      <VouchersAction handleCreateVoucherClick={handleCreateVoucherClick} />
      <VouchersList vouchers={vouchers} handlePreviewVoucher={handlePreviewVoucher} />
    </div>
  );
};
