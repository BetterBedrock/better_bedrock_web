import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { PreviewPopup } from "~/pages/project/components/preview-popup";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { useDownloadButton } from "~/pages/project/components/download-button/hooks/use-download-button";

export const DownloadButton = () => {
  const { handleDownload, downloadButtonRef, instantDownload, selectedProject } =
    useDownloadButton();

  if (!selectedProject?.downloadFile) return <></>;

  return (
    <PopupWrapper
      ignore={instantDownload}
      popup={(close) => <PreviewPopup onClose={close} project={selectedProject!} />}
    >
      <Button
        ref={downloadButtonRef}
        id="download"
        width="100%"
        type="green"
        onClick={async () => await handleDownload()}
        center
      >
        <BedrockText text="Download" type="p" color="white" />
      </Button>
    </PopupWrapper>
  );
};
