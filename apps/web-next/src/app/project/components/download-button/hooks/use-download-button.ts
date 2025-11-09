"use client";

import { DetailedProjectDto, UserDto } from "@/_lib/api";
import { generateDownload } from "@/_lib/downloads/generate-download";
import { useFetchVoucher } from "@/hooks/use-fetch-voucher";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

export const useDownloadButton = (
  user: UserDto,
  detailedProject: DetailedProjectDto
) => {
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
    if (!instantDownload) return;

    await generateDownload(detailedProject.id);
    router.push(Routes.HOME);
  };

  return { handleClick, instantDownload };
};