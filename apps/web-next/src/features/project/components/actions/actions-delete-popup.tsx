"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";
import { Card, CardBody } from "@/components/card";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { InputSwitch } from "@/components/input/input-switch";
import { Popup } from "@/components/popup";
import { BasePopupWrapperProps } from "@/components/popup/popup-wrapper";
import { Tooltip } from "@/components/tooltip";
import { useActionsDeletePopup } from "@/features/project/hooks/use-actions-delete-popup";

import styles from "./actions.module.scss";

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
                  <Card>
                    <CardBody>
                      <Popup.Content>
                        <BedrockText
                          text="What part of this project would you like to delete?"
                          type="p"
                          color="white"
                          textAlign="start"
                        />
                      </Popup.Content>
                    </CardBody>
                  </Card>
                </Popup.Part>
                <Popup.Part>
                  <Card negativeMarginTop>
                    <CardBody>
                      <Popup.Content>
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
                      </Popup.Content>
                    </CardBody>
                  </Card>
                </Popup.Part>
              </>
            ) : (
              <>
                <Popup.Part>
                  <Card negativeMarginTop>
                    <CardBody>
                      <Popup.Content>
                        <BedrockText
                          text="This project has no published version. Deleting will remove the entire project."
                          type="p"
                          color="white"
                          textAlign="start"
                        />
                      </Popup.Content>
                    </CardBody>
                  </Card>
                </Popup.Part>
              </>
            )}
          </>
        )}

        <Popup.Part>
          <Card sub negativeMarginTop>
            <CardBody>
              <Popup.Content>
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
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
