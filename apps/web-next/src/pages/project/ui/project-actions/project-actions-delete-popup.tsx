"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { InputSwitch } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";
import { BasePopupWrapperProps } from "@/shared/ui/popup";
import { Tooltip } from "@/shared/ui/tooltip";
import { useActionsDeletePopup } from "../../model/use-actions-delete-popup";

import styles from "./project-actions.module.scss";
import { ButtonGroup } from "@/shared/ui/button-group";

export const ProjectActionsDeletePopup = ({ close }: BasePopupWrapperProps) => {
  const {
    isLoading,
    existsProductionProject,
    deleteEverything,
    setDeleteEverything,
    setDeletePublishedOnly,
    disableDeleteButton,
    handleDelete,
    deleteOption,
    deletePublishedOnly,
  } = useActionsDeletePopup();

  return (
    <Popup title="Delete Options" onClose={close}>
      <Popup.Body>
        <Popup.Part>
          {isLoading ? (
            <CircularProgressIndicator center />
          ) : (
            <>
              {existsProductionProject ? (
                <>
                  <Popup.Item>
                    <BedrockText
                      text="What part of this project would you like to delete?"
                      type="p"
                      color="white"
                      textAlign="start"
                    />
                  </Popup.Item>
                  <Popup.Item>
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
                  </Popup.Item>

                  <Popup.Item>
                    <BedrockText
                      textAlign="start"
                      text="Selecting this option will delete only the published version of this project. Your draft will remain untouched."
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
                  </Popup.Item>
                </>
              ) : (
                <Popup.Item>
                  <BedrockText
                    text="This project has no published version. Deleting will remove the entire project."
                    type="p"
                    color="white"
                    textAlign="start"
                  />
                </Popup.Item>
              )}
            </>
          )}
        </Popup.Part>
      </Popup.Body>

      <Popup.Footer>
        <ButtonGroup>
          <Button type="white" center width="100%" onClick={close}>
            <BedrockText text="Cancel" type="p" color="black" />
          </Button>
          <Tooltip
            hidden={!disableDeleteButton}
            text="You need to choose a delete option"
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
      </Popup.Footer>
    </Popup>
  );
};
