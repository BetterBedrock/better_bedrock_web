"use client";

import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { Popup } from "@/shared/ui/popup";
import { DetailedUserDto, DetailedProjectDto } from "@/shared/lib/openapi";
import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { useEffect, useState } from "react";
import { resolveReport } from "@/entities/report";
import { reOpenReport } from "@/entities/report";

import { fetchProjectDetails } from "@/entities/project";
import { useNotification } from "@/app/providers/notification";
import { fetchDetailedUser } from "@/entities/user";
import { HeroReportsPopupBase } from "./hero-reports-popup-base";
import { HeroReportsPopupActions } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-actions";
import { HeroReportsPopupUserAvatar } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-user-avatar";
import { HeroReportsPopupGridDownloadCard } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-grid-download-card";

import styles from "./hero-reports-popup.module.scss";

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

  const displayBase = fetched && reporter && selectedReport;
  const displayUserAvatar = isUserReport && reported;
  const displayProjectCard = !isUserReport && project;
  return (
    <Popup title="Report" onClose={() => setSelectedReport(null)}>
      <Popup.Body>
        {!fetched && (
          <Popup.Part>
            <CircularProgressIndicator className={styles.loader} />
          </Popup.Part>
        )}

        {displayBase && (
          <HeroReportsPopupBase
            message={selectedReport!.message}
            reporter={reporter!}
          />
        )}

        {displayUserAvatar && (
          <HeroReportsPopupUserAvatar reported={reported!} />
        )}
        {displayProjectCard && (
          <HeroReportsPopupGridDownloadCard project={project!} />
        )}
      </Popup.Body>

      {fetched && selectedReport && (
        <HeroReportsPopupActions
          handleResolveButton={handleResolveButton}
          resolved={selectedReport.resolved}
        />
      )}
    </Popup>
  );
};
