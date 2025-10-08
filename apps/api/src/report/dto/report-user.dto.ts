import { PickType } from "@nestjs/swagger";
import { ReportDto } from "~/report/dto/report.dto";

export class ReportUserDto extends PickType(ReportDto, [
    "reporterId",
    "reportedUserId",
    "message",
] as const) {}
