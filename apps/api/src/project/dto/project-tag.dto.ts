import { IsBoolean, IsString } from "class-validator";

export class ProjectTagDto {
    @IsString()
    name: string;
    @IsString()
    projectId: string;
    @IsBoolean()
    projectDraft: boolean;
}
