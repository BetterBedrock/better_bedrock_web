"use client";

import { useRef } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";

import styles from "./project-card-preview.module.scss";
import { Card, CardBody } from "@/shared/ui/card";

interface ProjectCardPreviewDeclinePopupProps {
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}

export const ProjectCardPreviewDeclinePopup = ({
  onCancel,
  onSubmit,
}: ProjectCardPreviewDeclinePopupProps) => {
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
        </Popup.Part>

        <Popup.Part>
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
