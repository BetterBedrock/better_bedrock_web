"use client";

import { CreateVoucher, VoucherDto } from "@/lib/api";
import { createVoucher } from "@/lib/voucher/create-voucher";
import { fetchAllVouchers } from "@/lib/voucher/fetch-all-vouchers";
import { updateVoucher } from "@/lib/voucher/update-voucher";
import { useAuth } from "@/providers/auth";
import { useNotification } from "@/providers/notification";
import { useEffect, useState } from "react";

export const useVouchers = () => {
  const [vouchers, setVouchers] = useState<VoucherDto[] | undefined>();
  const { user } = useAuth();
  const { throwError } = useNotification();

  const [open, setOpen] = useState(false);
  const [voucher, setVoucher] = useState<VoucherDto | undefined>();

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
            : v
        )
      );
    } else {
      setVouchers((prev) => [...prev!, receivedVoucher]);
    }

    setOpen(false);
  };

  useEffect(() => {
    if (user && user.admin) {
      fetchAllVouchers().then((data) => setVouchers(data ?? []));
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
