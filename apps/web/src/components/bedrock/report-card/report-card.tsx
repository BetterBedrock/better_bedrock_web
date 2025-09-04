import React, { useEffect, useState } from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { DetailedProjectDto, ReportDto, SimpleUserDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";
import { useProject } from "~/providers/project";
import { useUser } from "~/providers/user";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

interface ReportCardProps {
  report: ReportDto;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

export const ReportCard = ({ report, lockClicking, height = "auto", onClick }: ReportCardProps) => {
  const { fetchProjectDetails } = useProject();
  const { findUserById } = useUser();
  const [reportedItem, setReportedItem] = useState<
    DetailedProjectDto | SimpleUserDto | undefined
  >();

  useEffect(() => {
    console.log({ report });
    if (report.reportedProjectId) {
      fetchProjectDetails(report.reportedProjectId).then((data) => setReportedItem(data));
    }

    if (report.reportedUserId) {
      findUserById(report.reportedUserId).then((data) => setReportedItem(data));
    }
  }, []);

  const name = () => {
    if (!reportedItem) return "";
    if ("title" in reportedItem) {
      return reportedItem.title;
    } else {
      return reportedItem.name;
    }
  };

  return (
    <Button
      width="100%"
      height={height}
      type="white"
      lockClicking={lockClicking}
      playSound={true}
      onClick={onClick}
    >
      {!reportedItem ? (
        <CircularProgressIndicator />
      ) : (
        <div className={styles.content}>
          {/* <BedrockText
          text={report.}
          type="h1"
          font="MinecraftTen"
          textAlign="left"
          extraClassName={styles.price}
        /> */}
          <div className={styles.description}>
            <strong>
              <BedrockText text={name()} type="p" textAlign="left" />
            </strong>
            <BedrockText text={report.message} type="p2" textAlign="left" />
          </div>
        </div>
      )}
    </Button>
  );
};
