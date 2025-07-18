import { VoucherCard } from "~/components/bedrock/voucher-card";
import { styles } from ".";
import { Button } from "~/components/bedrock/button";
import { useVoucher } from "~/providers/voucher";
import { useState } from "react";
import { VoucherForm } from "~/pages/panel/voucher/components/hero/voucher-form";
import { VoucherDto } from "~/lib/api";

export const Statistics = () => {
  const [open, setOpen] = useState(false);
  const [voucher, setVoucher] = useState<VoucherDto | undefined>();
  const { vouchers, createVoucher, updateVoucher } = useVoucher();

  const handleCreateVoucherClick = () => {
    setVoucher(undefined);
    setOpen(true);
  };

  return (
    <div className={styles.list}>
      <VoucherForm
        key={voucher?.code ?? ""}
        open={open}
        voucher={voucher}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={async (data) => {
          if (voucher) {
            await updateVoucher(voucher.id, data);
          } else {
            await createVoucher(data);
          }
          setOpen(false);
        }}
      />
      <Button
        onClick={handleCreateVoucherClick}
        className={styles.button}
        type="alwaysGreen"
        text="Create Voucher"
      />
      {vouchers.map((voucher) => (
        <VoucherCard
          voucher={voucher}
          onClick={async () => {
            setVoucher(voucher);
            setOpen(true);
          }}
        />
      ))}
    </div>
  );
};
