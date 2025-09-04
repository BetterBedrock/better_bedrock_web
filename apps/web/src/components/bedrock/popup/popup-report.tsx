import { useRef } from "react";
import { Popup } from "~/components/bedrock/popup/popup";
import { useReport } from "~/providers/report";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";

interface PopupReportProps {
  id: string;
  name: string;
  type: "project" | "user";
  onClose?: () => void;
}

export const PopupReport = ({ id, name, type, onClose }: PopupReportProps) => {
  const { reportProject, reportUser } = useReport();
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

    onClose?.();
  };

  return (
    <Popup title="Report" onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.part}>
          <BedrockText
            type="p"
            text={`You are about to report ${name}, what is your reasoning behind this report?`}
            textAlign="start"
            color="white"
          />
          <Input ref={inputRef} placeholder="Message" />
          <Button onClick={handleReport} type="green" center width="100%">
            <BedrockText type="p" text="Report" color="white" />
          </Button>
        </div>
      </div>
    </Popup>
  );
};
