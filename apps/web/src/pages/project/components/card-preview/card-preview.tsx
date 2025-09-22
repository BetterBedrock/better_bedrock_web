import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { PopupConfirmation } from "~/components/bedrock/popup/popup-confirmation";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { Routes } from "~/utils/routes";
import { useState } from "react";
import { useProject } from "~/providers/project";
import { CardPreviewDeclinePopup } from "~/pages/project/components/card-preview/card-preview-decline-popup";
import { HeaderTitle } from "~/pages/project/components/header";

export const CardPreview = () => {
  const navigate = useNavigate();
  const [declineOpen, setDeclineOpen] = useState(false);

  const { decline, publish } = useProject();
  const { selectedProject } = useProjectManager();
  return (
    <>
      {declineOpen && (
        <CardPreviewDeclinePopup
          onCancel={() => setDeclineOpen(false)}
          onSubmit={async (reason) => {
            await decline(selectedProject!.id, selectedProject!.title, reason);
            navigate(Routes.PANEL_PROJECTS);
          }}
        />
      )}
      <Card sub>
        <div className={styles.editor}>
          <HeaderTitle title="Review" />
        </div>
        <CardDivider sub />
        <div className={styles.editor}>
          {selectedProject && <GridDownloadCard project={{ ...selectedProject }} />}
        </div>
        <CardDivider sub />
        <div className={styles.editor}>
          <ButtonGroup>
            <PopupConfirmation
              description="Are you sure you want to publish this project?"
              confirmText="Publish"
              confirmType="gold"
            >
              <Button
                width="100%"
                height="100%"
                type="gold"
                center
                onClick={async () => {
                  await publish(selectedProject!.id, selectedProject!.title);
                  navigate(Routes.PANEL_PROJECTS);
                }}
              >
                <BedrockText text="Publish" type="p" color="white" />
              </Button>
            </PopupConfirmation>
            <Button width="100%" type="red" onClick={() => setDeclineOpen(true)} center>
              <BedrockText text="Decline Project" type="p" color="white" />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </>
  );
};
