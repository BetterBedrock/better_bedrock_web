"use client";

import {
  ReportDto,
} from "@/shared/lib/openapi";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ReportsManagerContextProps {
  resolvedReports: ReportDto[];
  unresolvedReports: ReportDto[];

  reports: ReportDto[];
  setReports: Dispatch<SetStateAction<ReportDto[]>>;

  selectedReport: ReportDto | null;
  setSelectedReport: Dispatch<SetStateAction<ReportDto | null>>;
}

interface ReportsManagerProviderProps {
  children: ReactNode;
  defaultReports: ReportDto[];
}

const ReportsManagerContext = createContext<
  ReportsManagerContextProps | undefined
>(undefined);

export const ReportsManagerProvider = ({
  children,
  defaultReports,
}: ReportsManagerProviderProps) => {
  const [reports, setReports] = useState<ReportDto[]>(defaultReports);

  const [selectedReport, setSelectedReport] = useState<ReportDto | null>(null);

  const [resolvedReports, unresolvedReports] = reports.reduce<
    [ReportDto[], ReportDto[]]
  >(
    (acc, report) => {
      acc[report.resolved ? 0 : 1].push(report);
      return acc;
    },
    [[], []],
  );

  return (
    <ReportsManagerContext.Provider
      value={{
        resolvedReports,
        unresolvedReports,
        reports,
        setReports,
        selectedReport,
        setSelectedReport,
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
      "useReportsManager has to be used within ReportsManagerContext",
    );
  }

  return context;
};
