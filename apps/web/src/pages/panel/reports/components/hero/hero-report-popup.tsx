import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Popup } from "~/components/bedrock/popup";
import { styles } from ".";
import { DetailedProjectDto, DetailedUserDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Routes } from "~/utils/routes";
import { Link } from "~/components/link";
import { Rating } from "~/components/rating";
import Steve from "~/assets/images/avatars/Steve.png";
import { useUser } from "~/providers/user";
import { useEffect, useState } from "react";
import { useProject } from "~/providers/project";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { useReport } from "~/providers/report";
import { useReportsManager } from "~/pages/panel/reports/providers/reports-manager";

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
      <div className={styles.part}>
        <Link link={Routes.PROFILE + "/" + reporter.name} className={styles.link}>
          <div className={styles.header}>
            <img src={Steve} className={styles.avatar} />

            {/* Renders the description, which can now be any React node */}
            <div>
              <BedrockText text={`@${reporter!.name}`} type={"p"} textAlign="left" color="white" />

              {<Rating simple rating={reporter.rating.average} />}
            </div>
          </div>
        </Link>
        <BedrockText type="p" text={selectedReport!.message} textAlign="start" color="white" />
      </div>
    );
  };

  const projectReport = () => {
    if (!project || !reporter) return <CircularProgressIndicator className={styles.loader} />;
    return (
      <>
        {baseReport()}
        <CardDivider />
        <div className={styles.part}>
          <GridDownloadCard project={project} mode="view" />
        </div>
        <CardDivider />
        <div className={styles.part}>
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
        </div>
      </>
    );
  };

  const userReport = () => {
    if (!reported || !reporter) return <CircularProgressIndicator className={styles.loader} />;
    return (
      <>
        {baseReport()}
        <CardDivider />
        <div className={styles.part}>
          <Card className={styles.profile}>
            <Link link={Routes.PROFILE + "/" + reported.name} className={styles.link}>
              <div className={styles.header}>
                <img src={Steve} className={styles.avatar} />

                {/* Renders the description, which can now be any React node */}
                <div>
                  <BedrockText
                    text={`@${reported!.name}`}
                    type={"p"}
                    textAlign="left"
                    color="white"
                  />
                  {<Rating simple rating={reported.rating.average} />}
                </div>
              </div>
            </Link>
          </Card>
        </div>
        <CardDivider />
        <div className={styles.part}>
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
        </div>
      </>
    );
  };

  return (
    <Popup title="Report" onClose={() => setSelectedReport(null)}>
      <div className={styles.container}>
        {!fetched ? (
          <CircularProgressIndicator className={styles.loader} />
        ) : isUserReport ? (
          userReport()
        ) : (
          projectReport()
        )}
      </div>
    </Popup>
  );
};
