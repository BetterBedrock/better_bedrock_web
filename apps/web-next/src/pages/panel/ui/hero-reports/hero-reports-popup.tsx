"use client";

import { Avatar } from "@/shared/ui/avatar";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { CardDivider, Card, CardBody } from "@/shared/ui/card";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { Popup } from "@/shared/ui/popup";
import { Rating } from "@/shared/ui/rating";
import { DetailedUserDto, DetailedProjectDto } from "@/shared/lib/openapi";
import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { useEffect, useState } from "react";
import { resolveReport } from "@/entities/report";
import { reOpenReport } from "@/entities/report";

import styles from "./hero-reports.module.scss";
import { fetchProjectDetails } from "@/entities/project";
import { useNotification } from "@/app/providers/notification";
import { fetchDetailedUser } from "@/entities/user";

export const HeroReportsPopup = () => {
  const { throwError } = useNotification();

  const { selectedReport, setSelectedReport, setReports } = useReportsManager();

  const isUserReport = !!selectedReport!.reportedUserId;
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setReporter(await fetchDetailedUser(selectedReport!.reporterId));
      if (selectedReport!.reportedUserId) {
        setReported(await fetchDetailedUser(selectedReport!.reportedUserId));
      }

      if (selectedReport!.reportedProjectId) {
        const { data, error } = await fetchProjectDetails(
          selectedReport!.reportedProjectId,
        );
        if (error) {
          throwError(null, error);
          return;
        }

        setProject(data);
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
          : p,
      ),
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
        <Popup.Part>
          {/* <Card className={styles.profile}> */}
          <Avatar>
            <Avatar.Profile name={reported.name} size="medium" />
            <Avatar.Details name={reported.name} at>
              <Rating simple rating={reported.rating.average} />
            </Avatar.Details>
          </Avatar>
          {/* </Card> */}
        </Popup.Part>
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
