"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup/popup-wrapper";
import { DetailedProjectDto, UserDto, VoucherDto } from "@/shared/api/openapi";
import { useDownloadButton } from "@/widgets/project-download/model/use-download-button";
import { PreviewPopup } from "@/widgets/project-download/ui/preview-popup/preview-popup";

import styles from "./project-download.module.scss";

interface ProjectDownloadPopupProps {
  voucher?: VoucherDto;
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

export const ProjectDownloadPopup = ({
  detailedProject,
  user,
  voucher,
}: ProjectDownloadPopupProps) => {
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
