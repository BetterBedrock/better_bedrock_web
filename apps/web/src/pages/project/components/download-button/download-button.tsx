import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { useDownload } from "~/providers/download";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { PreviewPopup } from "~/pages/project/components/preview-popup";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";

export const DownloadButton = () => {
  const { user } = useAuth();
  const { generateDownload } = useDownload();
  const { selectedProject, downloadButtonRef } = useProjectManager();

  const instantDownload = selectedProject!.userId === user?.id || user?.admin;

  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!instantDownload) {
      return;
    }

    await generateDownload(selectedProject!);
    navigate(Routes.FETCH);
  };

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
