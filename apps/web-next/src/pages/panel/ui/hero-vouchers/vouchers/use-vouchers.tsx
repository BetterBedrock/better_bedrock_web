"use client";

import { CreateVoucher, VoucherDto } from "@/shared/lib/openapi";

import { useEffect, useState } from "react";
import { useNotification } from "@/app/providers/notification";
import { useAuth } from "@/app/providers/auth";
import { createVoucher } from "@/pages/panel/api/create-voucher";
import { fetchAllVouchers } from "@/pages/panel/api/fetch-all-vouchers";
import { updateVoucher } from "@/pages/panel/api/update-voucher";

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
