"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Popup } from "@/shared/ui/popup";

import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { useHandlePublishButton } from "@/pages/project/model/use-handle-publish-button";

interface ProjectCardPreviewPublishPopupProps {
  onClose?: () => void;
}

export const ProjectCardPreviewPublishPopup = ({
  onClose,
}: ProjectCardPreviewPublishPopupProps) => {
  const [notify, setNotify] = useState(true);
  const [updateLastChanged, setUpdateLastChanged] = useState(true);
  const onPublish = useHandlePublishButton({
    onClose,
    notify: notify,
    updateLastChanged: updateLastChanged,
  });

  const switchNotify = () => {
    setNotify((prev) => !prev);
  };

  const switchUpdateLastChanged = () => {
    setUpdateLastChanged((prev) => !prev);
  };

  return (
    <Popup onClose={onClose} title="Publish Project">
      <Popup.Body>
        <Popup.Part>
          <Popup.Item>
            <BedrockText
              textAlign="start"
              text="Notify user via email about the publication"
              type="p"
              color="white"
            />
            <Input.Switch checked={notify} onChange={switchNotify} />
          </Popup.Item>
        </Popup.Part>
        <Popup.Part>
          <Popup.Item>
            <BedrockText
              textAlign="start"
              text="Update project last changed date to now"
              type="p"
              color="white"
            />
            <Input.Switch
              checked={updateLastChanged}
              onChange={switchUpdateLastChanged}
            />
          </Popup.Item>
        </Popup.Part>
      </Popup.Body>
      <Popup.Footer>
        <Button
          width="100%"
          height="100%"
          type="gold"
          center
          onClick={onPublish}
        >
          <BedrockText text="Publish" type="p" color="white" />
        </Button>
      </Popup.Footer>
    </Popup>
  );
};
