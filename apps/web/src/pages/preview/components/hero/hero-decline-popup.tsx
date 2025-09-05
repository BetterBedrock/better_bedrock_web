import { useRef } from "react";
import { styles } from ".";
import { Popup } from "~/components/bedrock/popup/popup";
import { Button } from "~/components/bedrock/button"; // Assuming a Button component exists
import React from "react";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Input } from "~/components/bedrock/input";

interface HeroDeclinePopupProps {
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}

export const HeroDeclinePopup = ({ onCancel, onSubmit }: HeroDeclinePopupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popup title="Decline Project" onClose={onCancel}>
      <div className={styles.container}>
        <div className={styles.part}>
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
        </div>
      </div>
    </Popup>
  );
};
