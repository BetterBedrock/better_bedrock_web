"use client";

import {
  ReportProjectBodyDto,
  ReportDto,
  Configuration,
  ReportApi,
} from "@/lib/api";
import { useNotification } from "@/providers/notification";
import { useFetchSecret } from "@/hooks/use-fetch-secret";
import { baseUrl } from "@/utils/url";
import { createContext, ReactNode, useContext } from "react";

interface ReportContextProps {
  reportProject: (id: string, body: ReportProjectBodyDto) => Promise<void>;
  reportUser: (id: string, body: ReportProjectBodyDto) => Promise<void>;
  fetchReports: () => Promise<ReportDto[] | undefined>;
  resolveReport: (id: string) => Promise<ReportDto | undefined>;
  reopenReport: (id: string) => Promise<ReportDto | undefined>;
}

interface ReportProviderProps {
  children: ReactNode;
}

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

export const ReportProvider = ({ children }: ReportProviderProps) => {
  const secret = useFetchSecret();

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: secret,
  });
  const reportApi = new ReportApi(config);
  const { throwError } = useNotification();

  const reportProject = async (id: string, body: ReportProjectBodyDto) => {
    try {
      await reportApi.reportControllerReportProject(id, body);
    } catch (err) {
      throwError(err, "Failed to report project");
    }
  };

  const reportUser = async (id: string, body: ReportProjectBodyDto) => {
    try {
      await reportApi.reportControllerReportUser(id, body);
    } catch (err) {
      throwError(err, "Failed to report user");
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await reportApi.reportControllerFetchReports();
      return data;
    } catch (err) {
      throwError(err, "Failed to report user");
    }
  };

  const resolveReport = async (id: string) => {
    try {
      const { data } = await reportApi.reportControllerResolveReport(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to resolve report");
    }
  };

  const reopenReport = async (id: string) => {
    try {
      const { data } = await reportApi.reportControllerReopenReport(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to reopen report");
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reportProject,
        reportUser,
        fetchReports,
        resolveReport,
        reopenReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw Error("useReport has to be used within ReportContext");
  }

  return context;
};
