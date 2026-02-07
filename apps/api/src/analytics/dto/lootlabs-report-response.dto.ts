export class LootlabsReportResponseDto {
    type: string;
    request_time: number;
    message: {
        columns: string[];
        count: number;
        results: {
            total_revenue?: number;
            total_impressions?: number;
            report_date?: string;
        }[];
    };
}
