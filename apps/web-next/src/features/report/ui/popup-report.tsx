"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";
import { reportUser, reportProject } from "@/entities/report";
import { useNotification } from "@/app/providers/notification";
import { useRef } from "react";

interface PopupReportComponentProps {
  id: string;
  name: string;
  defaultMessage?: string;
  type: "project" | "user";
  onClose?: () => void;
}

export const PopupReport = (props: PopupReportComponentProps) => (
  <PopupReportComponent {...props} />
);

const PopupReportComponent = ({
  id,
  name,
  type,
  defaultMessage,
  onClose,
}: PopupReportComponentProps) => {
  const { sendNotification } = useNotification();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReport = async () => {
    if (!inputRef.current) return;

    const message = inputRef.current.value;

    if (type === "project") {
      await reportProject(id, { message });
    }

    if (type === "user") {
      await reportUser(id, { message });
    }

    sendNotification({
      title: "Report Sent",
      label: `You have successfully reported this ${type}`,
      type: "success",
    });

    onClose?.();
  };

  return (
    <Popup title="Report" onClose={onClose}>
      <Popup.Body>
        <Popup.Part>
          <Popup.Item>
            <BedrockText
              type="p"
              text={`You are about to report ${name}, what is your reasoning behind this report?`}
              textAlign="start"
              color="white"
            />
            <Input
              sub 
              ref={inputRef}
              placeholder="Message"
              value={defaultMessage}
            />
          </Popup.Item>
        </Popup.Part>
      </Popup.Body>
      <Popup.Footer>
        <Button onClick={handleReport} type="green" center width="100%">
          <BedrockText type="p" text="Report" color="white" />
        </Button>
      </Popup.Footer>
    </Popup>
  );
};
