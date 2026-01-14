"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { Card, CardBody, CardDivider } from "@/components/card";
import { Input } from "@/components/input";
import { Popup } from "@/components/popup/popup";
import { reportProject } from "@/lib/report/report-project";
import { reportUser } from "@/lib/report/report-user";
import { useNotification } from "@/providers/notification";
import { ReportProvider, useReport } from "@/providers/report";
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
      <Popup.Wrapper>
        <Popup.Part>
          <Card>
            <CardBody>
              <Popup.Content>
                <BedrockText
                  type="p"
                  text={`You are about to report ${name}, what is your reasoning behind this report?`}
                  textAlign="start"
                  color="white"
                />
                <Input ref={inputRef} placeholder="Message" value={defaultMessage} />
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
        <Popup.Part>
          <Card sub negativeMarginTop>
            <CardBody>
              <Popup.Content>
                <Button onClick={handleReport} type="green" center width="100%">
                  <BedrockText type="p" text="Report" color="white" />
                </Button>
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};