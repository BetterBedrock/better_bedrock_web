"use client";

import { useRef } from "react";
import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";
import { Input } from "@/components/input";
import { Popup } from "@/components/popup";

import styles from "./card-preview.module.scss";
import { Card, CardBody } from "@/components/card/card";

interface CardPreviewDeclinePopupProps {
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}

export const CardPreviewDeclinePopup = ({
  onCancel,
  onSubmit,
}: CardPreviewDeclinePopupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popup title="Decline Project" onClose={onCancel}>
      <Popup.Wrapper>
        <Popup.Part>
          <Card>
            <CardBody>
              <Popup.Content>
                <BedrockText
                  type="p"
                  text="You are about to decline this project, what is your reasoning?"
                  textAlign="start"
                  color="white"
                />
                <Input ref={inputRef} placeholder="Reason" />
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>

        <Popup.Part>
          <Card sub negativeMarginTop>
            <CardBody>
              <Popup.Content>
                <ButtonGroup className={styles.group}>
                  <Button onClick={onCancel} type="white" center width="100%">
                    <BedrockText type="p" text="Cancel" color="black" />
                  </Button>
                  <Button
                    onClick={() => onSubmit(inputRef.current?.value ?? "")}
                    type="red"
                    center
                    width="100%"
                  >
                    <BedrockText type="p" text="Decline" color="white" />
                  </Button>
                </ButtonGroup>
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
