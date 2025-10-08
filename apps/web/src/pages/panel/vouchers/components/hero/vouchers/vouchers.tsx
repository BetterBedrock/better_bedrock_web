import { Banner } from "~/components/bedrock/banner";
import { styles, useVouchers, VouchersAction, VouchersList } from ".";
import { VoucherForm } from "~/pages/panel/vouchers/components/hero/voucher-form";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

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
      {vouchers?.length === 0 && <Banner message="No vouchers found" type="neutral" />}
      {vouchers ? (
        <VouchersList vouchers={vouchers} handlePreviewVoucher={handlePreviewVoucher} />
      ) : (
        <CircularProgressIndicator center />
      )}
    </div>
  );
};
