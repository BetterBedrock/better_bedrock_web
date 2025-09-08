import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export class ProjectTagDto {
    @IsString()
    @MinLength(1, { message: "Each tag cannot be shorter than 1 characters" })
    @MaxLength(15, { message: "Tag '$value' cannot be longer than 15 characters" })
    name: string;
    @IsString()
    projectId: string;
    @IsBoolean()
    projectDraft: boolean;
}
