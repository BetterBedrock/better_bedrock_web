"use client";

import { DetailedProjectDto, UserDto } from "@/lib/api";
import { generateDownload } from "@/lib/downloads/generate-download";
import { useNotification } from "@/providers/notification";
import { useFetchVoucher } from "@/hooks/use-fetch-voucher";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

export const useDownloadButton = (
  user: UserDto,
  detailedProject: DetailedProjectDto
) => {
  const { sendNotification } = useNotification();
  const router = useRouter();
  const voucher = useFetchVoucher();

  const isCreatorOrAdmin =
    detailedProject.userId === user?.id || user?.admin === true;

  const hasValidVoucher =
    !!voucher &&
    (
      voucher.betterBedrockContentOnly === false ||
      (voucher.betterBedrockContentOnly === true &&
        detailedProject.betterBedrockContent === true)
    );

  const instantDownload = isCreatorOrAdmin || hasValidVoucher;

  const handleClick = async () => {
    if (hasValidVoucher) {
      sendNotification({
        title: "Applied Voucher",
        label: "You just used your voucher to download this content.",
        type: "success",
      });
    } else if (voucher) {
      sendNotification({
        title: "Cannot Apply Voucher",
        label: "Your voucher allows to download only better bedrock content without ads.",
        type: "info",
      });
    }

    if (!instantDownload) return;

    await generateDownload(detailedProject.id);
    router.push(Routes.FETCH);
  };

  return { handleClick, instantDownload };
};