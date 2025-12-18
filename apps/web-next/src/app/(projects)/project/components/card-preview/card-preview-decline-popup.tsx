"use client";

import { useRef } from "react";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Input } from "@/_components/input";
import { Popup } from "@/_components/popup";

import styles from "./card-preview.module.scss";

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
          <BedrockText
            type="p"
            text="You are about to decline this project, what is your reasoning?"
            textAlign="start"
            color="white"
          />
          <Input ref={inputRef} placeholder="Reason" />
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
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
