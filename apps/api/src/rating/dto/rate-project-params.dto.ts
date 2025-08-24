import { PickType } from "@nestjs/swagger";
import { RatingDto } from "~/rating/dto/rating.dto";

export class RateProjectParamsDto extends PickType(RatingDto, ["projectId", "rating"] as const) {}
