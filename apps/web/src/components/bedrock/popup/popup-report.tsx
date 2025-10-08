import { useRef } from "react";
import { Popup } from "~/components/bedrock/popup/popup";
import { ReportProvider, useReport } from "~/providers/report";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";
import { useNotification } from "~/providers/notification";
import { CardDivider } from "~/components/bedrock/card";

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
  const { reportProject, reportUser } = useReport();
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
