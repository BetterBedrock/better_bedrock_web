"use client";

import { ReportDto, DetailedUserDto, DetailedProjectDto } from "@/lib/api";
import { fetchAllReports } from "@/lib/report/fetch-all-reports";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ReportsManagerContextProps {
  reports: ReportDto[] | undefined;
  setReports: Dispatch<SetStateAction<ReportDto[] | undefined>>;

  selectedReport: ReportDto | null;
  setSelectedReport: Dispatch<SetStateAction<ReportDto | null>>;

  reporter: DetailedUserDto | undefined;
  setReporter: Dispatch<SetStateAction<DetailedUserDto | undefined>>;

  reported: DetailedUserDto | undefined;
  setReported: Dispatch<SetStateAction<DetailedUserDto | undefined>>;

  project: DetailedProjectDto | undefined;
  setProject: Dispatch<SetStateAction<DetailedProjectDto | undefined>>;
}

interface ReportsManagerProviderProps {
  children: ReactNode;
}

const ReportsManagerContext = createContext<
  ReportsManagerContextProps | undefined
>(undefined);

export const ReportsManagerProvider = ({
  children,
}: ReportsManagerProviderProps) => {
  const [reports, setReports] = useState<ReportDto[]>();

  const [selectedReport, setSelectedReport] = useState<ReportDto | null>(null);
  const [reporter, setReporter] = useState<DetailedUserDto | undefined>();
  const [reported, setReported] = useState<DetailedUserDto | undefined>();
  const [project, setProject] = useState<DetailedProjectDto | undefined>();

  useEffect(() => {
    fetchAllReports().then((data) => setReports(data));
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
    throw Error(
      "useReportsManager has to be used within ReportsManagerContext"
    );
  }

  return context;
};
