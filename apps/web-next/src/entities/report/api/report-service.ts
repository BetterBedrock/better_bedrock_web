"use server";

import { ReportApi, ReportProjectBodyDto } from "@/shared/lib/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/lib/utils";

const reportApi = new ReportApi(baseApiConfig, undefined, axiosCustomInstance);

export const fetchAllReportsRequest = async (secret: string) =>
    reportApi.reportControllerFetchReports({
        headers: { Authorization: `Bearer ${secret}` },
    });

export const reopenReportRequest = async (id: string, secret: string) =>
    reportApi.reportControllerReopenReport(id, {
        headers: { Authorization: `Bearer ${secret}` },
    });

export const reportProjectRequest = async (
    id: string,
    reportProjectData: ReportProjectBodyDto,
    secret: string,
) =>
    reportApi.reportControllerReportProject(id, reportProjectData, {
        headers: { Authorization: `Bearer ${secret}` },
    });

export const reportUserRequest = async (
    id: string,
    reportProjectData: ReportProjectBodyDto,
    secret: string,
) =>
    reportApi.reportControllerReportUser(id, reportProjectData, {
        headers: { Authorization: `Bearer ${secret}` },
    });

export const resolveReportRequest = async (id: string, secret: string) =>
    reportApi.reportControllerResolveReport(id, {
        headers: { Authorization: `Bearer ${secret}` },
    });
