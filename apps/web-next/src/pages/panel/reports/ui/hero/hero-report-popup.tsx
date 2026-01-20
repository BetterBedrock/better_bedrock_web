"use client";

import { Avatar } from "@/shared/ui/avatar";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { CardDivider, Card, CardBody } from "@/shared/ui/card";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { Popup } from "@/shared/ui/popup";
import { Rating } from "@/shared/ui/rating";
import { DetailedUserDto, DetailedProjectDto } from "@/shared/api/openapi";
import { useReportsManager } from "@/pages/panel/reports/model/reports-manager";
import { useEffect, useState } from "react";
import { resolveReport } from "@/lib/report/resolve-report";
import { reOpenReport } from "@/lib/report/re-open-report";

import styles from "./hero.module.scss";
import { fetchProjectDetails } from "@/entities/project/api/fetch-project-details";
import { useNotification } from "@/shared/model/notification";
import { fetchDetailedUser } from "@/lib/user";

export const HeroReportPopup = () => {
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
        <Card>
          <CardBody>
            <Popup.Content>
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
            </Popup.Content>
          </CardBody>
        </Card>
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
          <Card>
            <CardBody>
              <Popup.Content>
                <GridDownloadCard project={project} mode="view" />
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
        <Popup.Part>
          <Card>
            <CardBody>
              <Popup.Content>
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
              </Popup.Content>
            </CardBody>
          </Card>
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
          <Card>
            <CardBody>
              <Popup.Content>
                {/* <Card className={styles.profile}> */}
                <Avatar>
                  <Avatar.Profile name={reported.name} size="medium" />
                  <Avatar.Details name={reported.name} at>
                    <Rating simple rating={reported.rating.average} />
                  </Avatar.Details>
                </Avatar>
                {/* </Card> */}
              </Popup.Content>
            </CardBody>
          </Card>
        </Popup.Part>
        <Popup.Part>
          <Card sub negativeMarginTop>
            <CardBody>
              <Popup.Content>
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
              </Popup.Content>
            </CardBody>
          </Card>
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
