"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Card, CardBody } from "@/shared/ui/card";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { InputSwitch } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";
import { BasePopupWrapperProps } from "@/shared/ui/popup";
import { Tooltip } from "@/shared/ui/tooltip";
import { useActionsDeletePopup } from "../../model/use-actions-delete-popup";

import styles from "./project-actions.module.scss";

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
