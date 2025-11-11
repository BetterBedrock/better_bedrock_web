"use client"

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { CardDivider } from "@/_components/card";
import { Input } from "@/_components/input";
import { Popup } from "@/_components/popup/popup";
import { reportProject } from "@/_lib/report/report-project";
import { reportUser } from "@/_lib/report/report-user";
import { useNotification } from "@/_providers/notification";
import { ReportProvider, useReport } from "@/_providers/report";
import { useRef } from "react";

interface PopupReportComponentProps {
  id: string;
  name: string;
  defaultMessage?: string;
  type: "project" | "user";
  onClose?: () => void;
}

export const PopupReport = (props: PopupReportComponentProps) => (
  <ReportProvider>
    <PopupReportComponent {...props} />
  </ReportProvider>
);

const PopupReportComponent = ({ id, name, type, defaultMessage, onClose }: PopupReportComponentProps) => {
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
      <Popup.Wrapper>
        <Popup.Part>
          <BedrockText
            type="p"
            text={`You are about to report ${name}, what is your reasoning behind this report?`}
            textAlign="start"
            color="white"
          />
          <Input ref={inputRef} placeholder="Message" value={defaultMessage} />
        </Popup.Part>
        <CardDivider />
        <Popup.Part>
          <Button onClick={handleReport} type="green" center width="100%">
            <BedrockText type="p" text="Report" color="white" />
          </Button>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
