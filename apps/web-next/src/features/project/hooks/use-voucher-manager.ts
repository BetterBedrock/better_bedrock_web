"use client";

import { activateVoucher } from "@/features/project/server/activate-voucher";
import { ProjectDto } from "@/lib/api";
import { generateDownload } from "@/lib/downloads/generate-download";
import { fetchUserById } from "@/lib/user/fetch-user-by-id";
import { useCheckout } from "@/providers/checkout";
import { useNotification } from "@/providers/notification";
import { getLinkvertiseUrl, openLinkvertise } from "@/utils/download";
import { useState, KeyboardEvent } from "react";

interface usePreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const useVoucherManager = ({ project, onClose }: usePreviewPopupProps) => {
  const { offers } = useCheckout();
  const { sendNotification, throwError } = useNotification();
  const categories = offers?.offers;

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(categories ? categories[0].title : undefined);

  const download = async () => {
    await generateDownload(project.id);
    const creator = await fetchUserById(project.userId);

    const linkvertiseId = creator?.customLinkvertise
      ? (creator.linkvertiseId ?? process.env.NEXT_PUBLIC_LINKVERTISE_ID)
      : process.env.NEXT_PUBLIC_LINKVERTISE_ID;

    await openLinkvertise(linkvertiseId ?? "");
  };

  const getLinkvertiseId = async (): Promise<string> => {
    const creator = await fetchUserById(project.userId);

    let linkvertiseId = process.env.NEXT_PUBLIC_LINKVERTISE_ID;

    if (creator?.customLinkvertise && creator?.linkvertiseId && creator.linkvertiseId.trim().length > 0) {
      linkvertiseId = creator.linkvertiseId;
    }

    return await getLinkvertiseUrl(linkvertiseId ?? "");
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
  }

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
    getLinkvertiseId,
  };
};
