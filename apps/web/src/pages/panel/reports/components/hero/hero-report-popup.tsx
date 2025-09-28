import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Popup } from "~/components/bedrock/popup";
import { styles } from ".";
import { DetailedProjectDto, DetailedUserDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Rating } from "~/components/rating";
import { useUser } from "~/providers/user";
import { useEffect, useState } from "react";
import { useProject } from "~/providers/project";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { useReport } from "~/providers/report";
import { useReportsManager } from "~/pages/panel/reports/providers/reports-manager";
import { Avatar } from "~/components/avatar";

export const HeroReportPopup = () => {
  const { findDetailedUser } = useUser();
  const { selectedReport, setSelectedReport, setReports } = useReportsManager();
  const { fetchProjectDetails } = useProject();
  const { resolveReport, reopenReport } = useReport();

  const isUserReport = !!selectedReport!.reportedUserId;
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();
  const [fetched, setFetched] = useState(false);

  const fetchReportData = async () => {
    setReporter(await findDetailedUser(selectedReport!.reporterId));
    if (selectedReport!.reportedUserId) {
      setReported(await findDetailedUser(selectedReport!.reportedUserId));
    }

    if (selectedReport!.reportedProjectId) {
      setProject(await fetchProjectDetails(selectedReport!.reportedProjectId));
    }

    setFetched(true);
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const handleResolveButton = async () => {
    const newReport = selectedReport!.resolved
      ? await reopenReport(selectedReport!.id)
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
    if (!reporter) return <CircularProgressIndicator className={styles.loader} />;

    return (
      <Popup.Part>
        <Avatar>
          <Avatar.Profile name={reporter.name} size="medium" />
          <Avatar.Details name={reporter.name} at>
            {<Rating simple rating={reporter.rating.average} />}
          </Avatar.Details>
        </Avatar>
        <BedrockText type="p" text={selectedReport!.message} textAlign="start" color="white" />
      </Popup.Part>
    );
  };

  const projectReport = () => {
    if (!project || !reporter) return <CircularProgressIndicator className={styles.loader} />;
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
    if (!reported || !reporter) return <CircularProgressIndicator className={styles.loader} />;
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
