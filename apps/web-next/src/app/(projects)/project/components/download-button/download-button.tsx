"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { PopupWrapper } from "@/_components/popup/popup-wrapper";
import { DetailedProjectDto, UserDto } from "@/_lib/api";
import { useDownloadButton } from "@/app/(projects)/project/components/download-button/hooks/use-download-button";
import { PreviewPopup } from "@/app/(projects)/project/components/preview-popup/preview-popup";

interface DownloadButtonProps {
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

export const DownloadButton = ({
  detailedProject,
  user,
}: DownloadButtonProps) => {
  const { handleClick, instantDownload } = useDownloadButton(
    user!,
    detailedProject
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
      >
        <BedrockText text="Download" type="p" color="white" />
      </Button>
    </PopupWrapper>
  );
};
