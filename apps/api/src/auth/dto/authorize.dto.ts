import { IsString } from "class-validator";

export class AuthorizeDto {
    @IsString()
    token: string;
}
