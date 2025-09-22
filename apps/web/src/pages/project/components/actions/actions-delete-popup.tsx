import { useEffect, useState } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { CardDivider } from "~/components/bedrock/card";
import { InputSwitch } from "~/components/bedrock/input/input-switch";
import { Popup } from "~/components/bedrock/popup";
import { BasePopupWrapperProps } from "~/components/bedrock/popup/popup-wrapper";
import { Tooltip } from "~/components/bedrock/tooltip";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { useProject } from "~/providers/project";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNavigate } from "react-router-dom";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

export const ActionsDeletePopup = ({ close }: BasePopupWrapperProps) => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const [existsProductionProject, setExistsProductionProject] = useState<boolean | undefined>(
    undefined,
  );

  const [deleteEverything, setDeleteEverything] = useState(false);
  const [deletePublishedOnly, setDeletePublishedOnly] = useState(false);

  const { selectedProject } = useProjectManager();
  const { deleteProject, deleteProductionProject, fetchProjectDetails } = useProject();

  useEffect(() => {
    fetchProjectDetails(selectedProject!.id, false).then((data) =>
      setExistsProductionProject(!!data),
    );
  }, []);

  const isLoading = existsProductionProject === undefined;

  const disableDeleteButton = isLoading
    ? true
    : existsProductionProject
      ? !deleteEverything && !deletePublishedOnly
      : false;

  const deleteOption = !existsProductionProject
    ? deleteEverything
    : deletePublishedOnly
      ? deletePublishedOnly
      : deleteEverything;

  const handleDelete = async (publicOnly?: boolean) => {
    if (!selectedProject) return;

    if (publicOnly) {
      await deleteProductionProject(selectedProject.id, selectedProject.title);
    } else {
      await deleteProject(selectedProject.id, selectedProject.title);
    }

    sendNotification({
      title: "Deleted",
      label: "Successfully deleted project",
      type: "success",
    });

    navigate(Routes.HOME);
  };

  return (
    <Popup title="Delete Options" onClose={close}>
      <Popup.Wrapper>
        {isLoading ? (
          <Popup.Part>
            <CircularProgressIndicator center />
          </Popup.Part>
        ) : (
          <>
            {existsProductionProject ? (
              <>
                <Popup.Part>
                  <BedrockText
                    text="What part of this project would you like to delete?"
                    type="p"
                    color="white"
                    textAlign="start"
                  />
                </Popup.Part>
                <CardDivider />
                <Popup.Part>
                  <div>
                    <BedrockText
                      textAlign="start"
                      text="Selecting this option will delete this entire project (you will lose access to both draft & published versions)"
                      type="p"
                      color="white"
                    />
                    <InputSwitch
                      placeholder="Draft & Published Version"
                      checked={deleteEverything}
                      onChange={() => {
                        setDeleteEverything((prev) => !prev);
                        setDeletePublishedOnly(false);
                      }}
                    />
                  </div>

                  <div>
                    <BedrockText
                      textAlign="start"
                      text="Selecting this option will delete only published version of this project. Your draft will remain untouched."
                      type="p"
                      color="white"
                    />
                    <InputSwitch
                      placeholder="Published Version Only"
                      checked={deletePublishedOnly}
                      onChange={() => {
                        setDeletePublishedOnly((prev) => !prev);
                        setDeleteEverything(false);
                      }}
                    />
                  </div>
                </Popup.Part>
              </>
            ) : (
              <>
                <Popup.Part>
                  <BedrockText
                    text="This project has no published version. Deleting will remove the entire project."
                    type="p"
                    color="white"
                    textAlign="start"
                  />
                </Popup.Part>
                <CardDivider />
              </>
            )}
          </>
        )}

        <Popup.Part>
          <ButtonGroup>
            <Button type="white" center width="100%" onClick={close}>
              <BedrockText text="Cancel" type="p" color="black" />
            </Button>
            <Tooltip
              hidden={!disableDeleteButton}
              text="You need to choose delete option"
              className={styles.tooltip}
            >
              <Button
                type={disableDeleteButton ? "dark" : "red"}
                center
                width="100%"
                lockClicking={disableDeleteButton}
                isToggled={disableDeleteButton}
                isClicked={disableDeleteButton}
                onClick={async () => await handleDelete(deleteOption)}
              >
                <BedrockText text="Delete" type="p" color="white" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
