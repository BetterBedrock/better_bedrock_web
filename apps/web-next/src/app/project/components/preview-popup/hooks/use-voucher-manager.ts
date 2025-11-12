"use client";

import { ProjectDto } from "@/_lib/api";
import { activateVoucher } from "@/_lib/checkout";
import { generateDownload } from "@/_lib/downloads/generate-download";
import { useCheckout } from "@/_providers/checkout";
import { useNotification } from "@/_providers/notification";
import { useUser } from "@/_providers/user";
import { useFetchVoucher } from "@/hooks/use-fetch-voucher";
import { getLinkvertiseUrl, openLinkvertise } from "@/utils/download";
import { Routes } from "@/utils/routes";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent } from "react";

interface usePreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const useVoucherManager = ({ project, onClose }: usePreviewPopupProps) => {
  const { offers } = useCheckout();
  const categories = offers?.offers;

  const { sendNotification } = useNotification();

  const cookies = useCookies();

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(categories ? categories[0].title : undefined);

  const { findUserById } = useUser();

  const activate = async () => {
    const voucher = await activateVoucher(undefined, voucherCode);
    if (voucher) {
      cookies.set("voucher", JSON.stringify(voucher));
      sendNotification({
        title: "Voucher Activated",
        label: "You succesfully activated your voucher",
        type: "success",
      });
      onClose?.();
    }
  };

  const download = async () => {
    await generateDownload(project.id);
    const creator = await findUserById(project.userId);

    const linkvertiseId = creator?.customLinkvertise
      ? (creator.linkvertiseId ?? process.env.NEXT_PUBLIC_LINKVERTISE_ID)
      : process.env.NEXT_PUBLIC_LINKVERTISE_ID;

    await openLinkvertise(linkvertiseId ?? "");
  };

  const getLinkvertiseId = async (): Promise<string> => {
    const creator = await findUserById(project.userId);

    let linkvertiseId = process.env.NEXT_PUBLIC_LINKVERTISE_ID;

    if (creator?.customLinkvertise && creator?.linkvertiseId && creator.linkvertiseId.trim().length > 0) {
      linkvertiseId = creator.linkvertiseId;
    }

    return await getLinkvertiseUrl(linkvertiseId ?? "");
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
    getLinkvertiseId,
  };
};
