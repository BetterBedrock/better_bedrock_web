"use client";

import { DetailedProjectDto, UserDto, VoucherDto } from "@/shared/lib/openapi";
import { generateDownload } from "@/entities/download";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/providers/notification";
import { Routes } from "@/shared/lib/utils";
import { useState } from "react";

export const useDownloadButton = (
  user: UserDto,
  detailedProject: DetailedProjectDto,
  voucher?: VoucherDto,
) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { sendNotification } = useNotification();
  const router = useRouter();

  const isCreatorOrAdmin =
    detailedProject.userId === user?.id || user?.admin === true;

  const isVoucherValidType =
    !!voucher &&
    (voucher.betterBedrockContentOnly === false ||
      (voucher.betterBedrockContentOnly === true &&
        detailedProject.betterBedrockContent === true));

  const hasVoucherExpired = dayjs(voucher?.expiresAt).isBefore(dayjs());
  const isVoucherUsed =
    (voucher?.downloadCount ?? 0) >= (voucher?.maxDownloads ?? 0);

  const instantDownload =
    isCreatorOrAdmin ||
    (isVoucherValidType && !hasVoucherExpired && !isVoucherUsed);

  const handleClick = async () => {
    if (isVoucherValidType) {
      sendNotification({
        title: "Applied Voucher",
        label: "You just used your voucher to download this content.",
        type: "success",
      });
    } else if (voucher) {
      sendNotification({
        title: "Cannot Apply Voucher",
        label:
          "Your voucher allows to download only better bedrock content without ads.",
        type: "info",
      });
      return;
    }

    if (!instantDownload) {
      setOpenPopup(true);
      return;
    }

    await generateDownload(detailedProject.id);

    router.push(Routes.FETCH);
  };

  const handleClosePopup = () => setOpenPopup(false);

  return { handleClick, openPopup, handleClosePopup };
};
