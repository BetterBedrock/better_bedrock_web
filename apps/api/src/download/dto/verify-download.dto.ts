import { IsString, Length } from "class-validator";

export class VerifyDownloadDto {
    /**
     * Hash generated to go through the ads on linkvertise
     * @example 'XtvYC1IqiGH06GcJdzWfggAos9XPS0WQZkclYWoXqV6nq4ar4u0OG9bNfuKfuguJ'
     */
    @IsString()
    @Length(64, 64)
    hash: string;
}
