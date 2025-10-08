import { PickType } from "@nestjs/swagger";
import { ReportDto } from "~/report/dto/report.dto";

export class ReportProjectBodyDto extends PickType(ReportDto, ["message"] as const) {}
