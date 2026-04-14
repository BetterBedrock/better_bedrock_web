import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class FetchCommentsParamsDto {
    @IsString()
    projectId: string;

    @Type(() => Number)
    @IsNumber()
    page: number;
}
