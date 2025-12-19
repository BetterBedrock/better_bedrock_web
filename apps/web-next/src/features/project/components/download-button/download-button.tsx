"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { PopupWrapper } from "@/components/popup/popup-wrapper";
import { DetailedProjectDto, UserDto } from "@/lib/api";
import { useDownloadButton } from "@/features/project/hooks/use-download-button";
import { PreviewPopup } from "@/features/project/components/preview-popup/preview-popup";

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
