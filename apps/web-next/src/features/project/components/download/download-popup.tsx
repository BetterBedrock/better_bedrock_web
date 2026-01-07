"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupWrapper } from "@/components/popup/popup-wrapper";
import { DetailedProjectDto, UserDto, VoucherDto } from "@/lib/api";
import { useDownloadButton } from "@/features/project/hooks/use-download-button";
import { PreviewPopup } from "@/features/project/components/preview-popup/preview-popup";

import styles from "./download.module.scss";

interface DownloadPopupProps {
  voucher?: VoucherDto;
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

export const DownloadPopup = ({
  detailedProject,
  user,
  voucher,
}: DownloadPopupProps) => {
  const { handleClick, instantDownload } = useDownloadButton(
    user!,
    detailedProject,
    voucher,
  );

  if (!detailedProject?.downloadFile) return <></>;

  return (
    <PopupWrapper
    ignore={instantDownload}
      popup={(close) => (
        <PreviewPopup onClose={close} project={detailedProject!} />
      )}
    >
      <Button
        id="download"
        width="100%"
        type="green"
        onClick={handleClick}
        center
        className={styles.anchor}
      >
        <BedrockText text="Download" type="p" color="white" />
      </Button>
    </PopupWrapper>
  );
};
