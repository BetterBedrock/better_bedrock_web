"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup";
import { DetailedProjectDto, UserDto, VoucherDto } from "@/shared/lib/openapi";

import { useDownloadButton } from "@/pages/project/model/use-download-button";
import { PreviewPopup } from "@/pages/project/ui/project-download/preview-popup/preview-popup";

import styles from "./project-download.module.scss";
import { Card } from "@/shared/ui/card";

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
    <Card className={styles.card} sub>
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
    </Card>
  );
};
