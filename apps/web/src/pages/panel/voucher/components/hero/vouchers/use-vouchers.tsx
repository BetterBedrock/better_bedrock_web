import { useState } from "react";
import { VoucherDto, CreateVoucher } from "~/lib/api";
import { useVoucher } from "~/providers/voucher";

export const useVouchers = () => {
  const [open, setOpen] = useState(false);
  const [voucher, setVoucher] = useState<VoucherDto | undefined>();
  const { vouchers, updateVoucher, createVoucher } = useVoucher();

  const handleCreateVoucherClick = () => {
    setVoucher(undefined);
    setOpen(true);
  };

  const handlePreviewVoucher = async (voucher: VoucherDto) => {
    setVoucher(voucher);
    setOpen(true);
  };

  const handleSubmit = async (data: CreateVoucher) => {
    const receivedVoucher = voucher
      ? await updateVoucher(voucher.id, data)
      : await createVoucher(data);

    if (!receivedVoucher) return;

    setOpen(false);
  };

  return {
    voucher,
    handleSubmit,
    setOpen,
    open,
    vouchers,
    handleCreateVoucherClick,
    handlePreviewVoucher,
  };
};
