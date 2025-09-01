import { PickType } from "@nestjs/swagger";
import { JwtTokenDto } from "~/auth/dto/jwt-token.dto";

export class AuthorizeDto extends PickType(JwtTokenDto, ["token"] as const) {}
