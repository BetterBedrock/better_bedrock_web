import { IsBoolean, IsString } from "class-validator";

export class JwtTokenDto {
    /**
     * A unique token for user authentication
     * @example "xxxxx.yyyyy.zzzzz"
     */
    @IsString()
    token: string;

    /**
     * Determines whether the user account was just created
     * @example true
     */
    @IsBoolean()
    isNewUser: boolean;
}
