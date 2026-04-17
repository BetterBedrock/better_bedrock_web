import { useNotification } from "@/app/providers/notification";
import { fetchProjectDetails } from "@/entities/project";
import { reOpenReport, resolveReport } from "@/entities/report";
import { fetchDetailedUser } from "@/entities/user";
import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { DetailedUserDto, DetailedProjectDto } from "@/shared/lib/openapi";
import { useState, useEffect } from "react";

export const useHeroReportsPopup = () => {
  const { throwError } = useNotification();

  const { selectedReport, setSelectedReport, setReports } = useReportsManager();

  const isUserReport = selectedReport?.reportedUserId;
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!selectedReport) return;

    const fetchReportData = async () => {
      setReporter(await fetchDetailedUser(selectedReport.reporterId));
      if (selectedReport.reportedUserId) {
        setReported(await fetchDetailedUser(selectedReport.reportedUserId));
      }

      if (selectedReport.reportedProjectId) {
        const { data, error } = await fetchProjectDetails(
          selectedReport.reportedProjectId,
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
  }, [selectedReport, throwError]);

  const handleResolveButton = async () => {
    if (!selectedReport) return;

    const newReport = selectedReport.resolved
      ? await reOpenReport(selectedReport.id)
      : await resolveReport(selectedReport.id);
      
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

  return { fetched, project, handleResolveButton, selectedReport, setSelectedReport, reporter, reported, displayBase, displayProjectCard, displayUserAvatar }
}