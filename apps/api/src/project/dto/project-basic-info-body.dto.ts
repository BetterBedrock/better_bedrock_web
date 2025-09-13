import { IsArray, IsString } from "class-validator";

export class ProjectBasicInfoBodyDto {
    @IsArray()
    @IsString({ each: true }) // validates every element in the array
    ids: string[];
}
