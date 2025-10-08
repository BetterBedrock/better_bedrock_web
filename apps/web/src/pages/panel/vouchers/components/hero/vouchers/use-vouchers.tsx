import { useEffect, useState } from "react";
import { VoucherDto, CreateVoucher } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { useVoucher } from "~/providers/voucher";

export const useVouchers = () => {
  const [vouchers, setVouchers] = useState<VoucherDto[] | undefined>();
  const { user } = useAuth();
  const { throwError } = useNotification();

  const [open, setOpen] = useState(false);
  const [voucher, setVoucher] = useState<VoucherDto | undefined>();
  const { updateVoucher, createVoucher, fetchVouchers } = useVoucher();

  const handleCreateVoucherClick = () => {
    setVoucher(undefined);
    setOpen(true);
  };

  const handlePreviewVoucher = async (voucher: VoucherDto) => {
    setVoucher(voucher);
    setOpen(true);
  };

  const handleSubmit = async (data: CreateVoucher) => {
    if (!vouchers) return;

    if (vouchers.find((v) => v.code === data.code)) {
      throwError(null, "Voucher with this code already exists");
      return;
    }

    const receivedVoucher = voucher
      ? await updateVoucher(voucher.id, data)
      : await createVoucher(data);

    if (!receivedVoucher) return;

    if (voucher) {
      setVouchers((prev) =>
        prev!.map((v) =>
          v.id === receivedVoucher.id
            ? {
                ...v,
                ...receivedVoucher,
              }
            : v,
        ),
      );
    } else {
      setVouchers((prev) => [...prev!, receivedVoucher]);
    }

    setOpen(false);
  };

  useEffect(() => {
    if (user && user.admin) {
      fetchVouchers().then((data) => setVouchers(data ?? []));
    }
  }, [user]);

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
