import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class Download {
    //TODO: This is just a test
    @IsEmail({}, { message: "Email must be a valid email address" })
    @Length(10, 32, { message: "Email must be between 10 and 32 characters long" })
    @ApiProperty()
    file: string;
}
