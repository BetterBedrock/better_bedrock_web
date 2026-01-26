"use client";

import { activateVoucher } from "@/entities/checkout";
import { ProjectDto } from "@/shared/lib/openapi";
import { useCheckout } from "@/app/providers/checkout";
import { useNotification } from "@/app/providers/notification";
import { getLinkvertiseUrl, openLinkvertise } from "@/shared/lib/utils";
import { useState, KeyboardEvent } from "react";
import { generateDownload } from "@/entities/download";
import { fetchUserById } from "@/entities/user";

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
    const data = await generateDownload(project.id);

    if (!data.url) {
      throwError(null, "There was a problem with the download link. Please report it on our discord.");
      return;
    }

    window.open(data.url.toString(), "_blank");
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

      onClose?.();
      // router.refresh();
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
