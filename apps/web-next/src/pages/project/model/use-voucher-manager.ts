"use client";

import { activateVoucher, setCookieVoucher } from "@/entities/checkout";
import { ProjectDto } from "@/shared/lib/openapi";
import { useCheckout } from "@/app/providers/checkout";
import { useNotification } from "@/app/providers/notification";
import { useState, KeyboardEvent } from "react";
import { generateDownload } from "@/entities/download";

interface usePreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const useVoucherManager = ({
  project,
  onClose,
}: usePreviewPopupProps) => {
  const { offers } = useCheckout();
  const { sendNotification, throwError } = useNotification();
  const categories = offers?.offers;

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    string | undefined
  >(categories ? categories[0].title : undefined);

  const download = async () => {
    const newTab = window.open('', '_blank');
    
    const data = await generateDownload(project.id);
    
    if (!data.url) {
      if (newTab) newTab.close();
      throwError(null, "There was a problem with the download link. Please report it on our discord.");
      return;
    }

    if (!newTab) return;
    newTab.location = data.url.toString();
  };

  const activate = async () => {
    const voucher = await activateVoucher(undefined, voucherCode);

    if (voucher?.error) {
      throwError(null, voucher.error);
      return;
    }

    if (voucher?.data) {
      sendNotification({
        title: "Voucher Activated",
        label: "You successfully activated your voucher",
        type: "success",
      });

      if (voucher.data.code) {
        await setCookieVoucher(voucher.data.code);
      }

      onClose?.();
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await activate();
    }
  };

  return {
    categories,
    handleKeyDown,
    selectedTimeframe,
    setSelectedTimeframe,
    voucherCode,
    setVoucherCode,
    activate,
    download,
  };
};
