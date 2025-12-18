"use client";

import { Avatar } from "@/_components/avatar";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { CardDivider, Card } from "@/_components/card";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { GridDownloadCard } from "@/_components/grid-download-card";
import { Popup } from "@/_components/popup";
import { Rating } from "@/_components/rating";
import { DetailedUserDto, DetailedProjectDto } from "@/_lib/api";
import { useProject } from "@/_providers/project";
import { useUser } from "@/_providers/user";
import { useReportsManager } from "@/app/(admin)/panel/reports/providers/reports-manager";
import { useEffect, useState } from "react";
import { resolveReport } from "@/_lib/report/resolve-report";
import { reOpenReport } from "@/_lib/report/re-open-report";

import styles from "./hero.module.scss";

export const HeroReportPopup = () => {
  const { findDetailedUser } = useUser();
  const { selectedReport, setSelectedReport, setReports } = useReportsManager();
  const { fetchProjectDetails } = useProject();

  const isUserReport = !!selectedReport!.reportedUserId;
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setReporter(await findDetailedUser(selectedReport!.reporterId));
      if (selectedReport!.reportedUserId) {
        setReported(await findDetailedUser(selectedReport!.reportedUserId));
      }

      if (selectedReport!.reportedProjectId) {
        setProject(
          await fetchProjectDetails(selectedReport!.reportedProjectId)
        );
      }

      setFetched(true);
    };

    fetchReportData();
  }, []);

  const handleResolveButton = async () => {
    const newReport = selectedReport!.resolved
      ? await reOpenReport(selectedReport!.id)
      : await resolveReport(selectedReport!.id);
    if (!newReport) return;
    setSelectedReport(newReport);
    setReports((prev) =>
      prev?.map((p) =>
        p.id === newReport.id
          ? {
              ...p,
              ...newReport,
            }
          : p
      )
    );
  };

  const baseReport = () => {
    if (!reporter)
      return <CircularProgressIndicator className={styles.loader} />;

    return (
      <Popup.Part>
        <Avatar>
          <Avatar.Profile name={reporter.name} size="medium" />
          <Avatar.Details name={reporter.name} at>
            {<Rating simple rating={reporter.rating.average} />}
          </Avatar.Details>
        </Avatar>
        <BedrockText
          type="p"
          text={selectedReport!.message}
          textAlign="start"
          color="white"
        />
      </Popup.Part>
    );
  };

  const projectReport = () => {
    if (!project || !reporter)
      return <CircularProgressIndicator className={styles.loader} />;
    return (
      <>
        {baseReport()}
        <CardDivider />
        <Popup.Part>
          <GridDownloadCard project={project} mode="view" />
        </Popup.Part>
        <CardDivider />
        <Popup.Part>
          <Button
            type={selectedReport!.resolved ? "white" : "green"}
            center
            width="100%"
            onClick={handleResolveButton}
          >
            <BedrockText
              text={selectedReport!.resolved ? "Reopen" : "Resolve"}
              type="p"
              color={selectedReport!.resolved ? "black" : "white"}
            />
          </Button>
        </Popup.Part>
      </>
    );
  };

  const userReport = () => {
    if (!reported || !reporter)
      return <CircularProgressIndicator className={styles.loader} />;
    return (
      <>
        {baseReport()}
        <CardDivider />
        <Popup.Part>
          <Card className={styles.profile}>
            <Avatar>
              <Avatar.Profile name={reported.name} size="medium" />
              <Avatar.Details name={reported.name} at>
                <Rating simple rating={reported.rating.average} />
              </Avatar.Details>
            </Avatar>
          </Card>
        </Popup.Part>
        <CardDivider />
        <Popup.Part>
          <Button
            type={selectedReport!.resolved ? "white" : "green"}
            center
            width="100%"
            onClick={handleResolveButton}
          >
            <BedrockText
              text={selectedReport!.resolved ? "Reopen" : "Resolve"}
              type="p"
              color={selectedReport!.resolved ? "black" : "white"}
            />
          </Button>
        </Popup.Part>
      </>
    );
  };

  return (
    <Popup title="Report" onClose={() => setSelectedReport(null)}>
      <Popup.Wrapper>
        {!fetched ? (
          <CircularProgressIndicator className={styles.loader} />
        ) : isUserReport ? (
          userReport()
        ) : (
          projectReport()
        )}
      </Popup.Wrapper>
    </Popup>
  );
};
