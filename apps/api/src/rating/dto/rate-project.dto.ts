import { PickType } from "@nestjs/swagger";
import { RatingDto } from "~/rating/dto/rating.dto";

export class RateProjectDto extends PickType(RatingDto, [
    "projectId",
    "rating",
    "userId",
] as const) {}
