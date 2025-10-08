import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ReportDto, DetailedUserDto, DetailedProjectDto } from "~/lib/api";
import { useReport } from "~/providers/report";

interface ReportsManagerContextProps {
  reports: ReportDto[] | undefined;
  setReports: React.Dispatch<React.SetStateAction<ReportDto[] | undefined>>;

  selectedReport: ReportDto | null;
  setSelectedReport: React.Dispatch<React.SetStateAction<ReportDto | null>>;

  reporter: DetailedUserDto | undefined;
  setReporter: React.Dispatch<React.SetStateAction<DetailedUserDto | undefined>>;

  reported: DetailedUserDto | undefined;
  setReported: React.Dispatch<React.SetStateAction<DetailedUserDto | undefined>>;

  project: DetailedProjectDto | undefined;
  setProject: React.Dispatch<React.SetStateAction<DetailedProjectDto | undefined>>;
}

interface ReportsManagerProviderProps {
  children: ReactNode;
}

const ReportsManagerContext = createContext<ReportsManagerContextProps | undefined>(undefined);

export const ReportsManagerProvider = ({ children }: ReportsManagerProviderProps) => {
  const { fetchReports } = useReport();
  const [reports, setReports] = useState<ReportDto[]>();

  const [selectedReport, setSelectedReport] = useState<ReportDto | null>(null);
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();

  useEffect(() => {
    fetchReports().then((data) => setReports(data));
  }, []);

  return (
    <ReportsManagerContext.Provider
      value={{
        reports,
        setReports,
        selectedReport,
        setSelectedReport,
        reporter,
        setReporter,
        reported,
        setReported,
        project,
        setProject,
      }}
    >
      {children}
    </ReportsManagerContext.Provider>
  );
};

export const useReportsManager = () => {
  const context = useContext(ReportsManagerContext);

  if (!context) {
    throw Error("useReportsManager has to be used within ReportsManagerContext");
  }

  return context;
};
