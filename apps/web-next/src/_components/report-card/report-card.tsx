"use client";

import { useEffect, useState } from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import dayjs from "dayjs";
import { Button } from "@/_components/button";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { ReportDto, SimpleUserDto, DetailedProjectDto } from "@/_lib/api";
import { useProject } from "@/_providers/project";
import { useUser } from "@/_providers/user";

interface ReportCardProps {
  report: ReportDto;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

export const ReportCard = ({
  report,
  lockClicking,
  height = "auto",
  onClick,
}: ReportCardProps) => {
  const { findUserById } = useUser();
  const { fetchProjectDetails } = useProject();
  const [reporter, setReporter] = useState<SimpleUserDto | undefined>();
  const [reported, setReported] = useState<SimpleUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();
  const [fetched, setFetched] = useState(false);

  const fetchDetails = async () => {
    setReporter(await findUserById(report.reporterId));
    if (report.reportedUserId) {
      setReported(await findUserById(report.reportedUserId));
    }

    if (report.reportedProjectId) {
      setProject(await fetchProjectDetails(report.reportedProjectId));
    }

    setFetched(true);
  };
  useEffect(() => {
    fetchDetails();
  }, [report]);

  if (!fetched) {
    return <CircularProgressIndicator center />;
  }

  const name = reported ? reported.name : project ? project.title : "Unknown";
  const hoursAgo = dayjs().diff(dayjs(report.createdAt), "hour");
  const resolvedAt = dayjs().diff(dayjs(report.resolvedAt), "hour");
  const textColor = report.resolved ? "white" : "black";

  return (
    <Button
      width="100%"
      height={height}
      type={report.resolved ? "green" : "white"}
      lockClicking={lockClicking}
      playSound={true}
      onClick={onClick}
    >
      {!fetched ? (
        <CircularProgressIndicator />
      ) : (
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.details}>
              <BedrockText
                text={`${reporter!.name} —> ${name}`}
                type="p"
                textAlign="left"
                font="Minecraft"
                color={textColor}
              />
            </div>
            <BedrockText
              text={report.message}
              type="p2"
              textAlign="left"
              color={textColor}
            />
            <BedrockText
              text={`${report.resolved ? "Resolved" : "Reported"} ${report.resolvedAt ? resolvedAt : hoursAgo}h ago`}
              type="p"
              textAlign="left"
              extraClassName={
                styles[report.resolved ? "resolved" : "unresolved"]
              }
            />
          </div>
        </div>
      )}
    </Button>
  );
};
