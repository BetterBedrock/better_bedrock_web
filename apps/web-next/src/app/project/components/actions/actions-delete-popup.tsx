"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { CardDivider } from "@/_components/card";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { InputSwitch } from "@/_components/input/input-switch";
import { Popup } from "@/_components/popup";
import { BasePopupWrapperProps } from "@/_components/popup/popup-wrapper";
import { Tooltip } from "@/_components/tooltip";

import { styles, useActionsDeletePopup } from ".";

export const ActionsDeletePopup = ({ close }: BasePopupWrapperProps) => {
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
                <CardDivider />
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
