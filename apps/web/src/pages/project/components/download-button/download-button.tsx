import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { useDownload } from "~/providers/download";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { useState } from "react";
import { PreviewPopup } from "~/pages/project/components/preview-popup";

export const DownloadButton = () => {
  const { user } = useAuth();
  const { generateDownload } = useDownload();
  const { selectedProject } = useProjectManager();
  const [showPopup, setShowPopup] = useState(false);

  const instantDownload = selectedProject!.userId === user?.id || user?.admin;

  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!instantDownload) {
      setShowPopup((prev) => !prev);
      return;
    }

    generateDownload(selectedProject!).then(() => {
      navigate(Routes.FETCH);
    });
  };

  if (!selectedProject?.downloadFile) return <></>;

  return (
    <>
      {showPopup && <PreviewPopup onClose={() => setShowPopup(false)} project={selectedProject!} />}

      <Button
        //   ref={ref}
        id="download"
        width="100%"
        type="green"
        onClick={async () => await handleDownload()}
        center
      >
        <BedrockText text="Download" type="p" color="white" />
      </Button>
    </>
  );
};
