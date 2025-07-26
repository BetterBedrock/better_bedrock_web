import { VoucherCard } from "~/components/bedrock/voucher-card";
import { styles } from ".";
import { useVoucher } from "~/providers/voucher";
import { useState } from "react";
import { VoucherForm } from "~/pages/panel/voucher/components/hero/voucher-form";
import { VoucherDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

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
          const receivedVoucher = voucher
            ? await updateVoucher(voucher.id, data)
            : await createVoucher(data);

          if (!receivedVoucher) return;

          setOpen(false);
        }}
      />
      <Button onClick={handleCreateVoucherClick} className={styles.button} type="green" center>
        <BedrockText color="white" type="p" text="Create Voucher" />
      </Button>
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
