import { PickType } from "@nestjs/swagger";
import { ReportDto } from "~/report/dto/report.dto";

export class ReportProjectDto extends PickType(ReportDto, [
    "reporterId",
    "reportedProjectId",
    "message",
] as const) {}
