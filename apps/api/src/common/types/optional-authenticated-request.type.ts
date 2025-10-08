import { Request } from "express";
import { UserDto } from "~/user/dto/user.dto";

export interface OptionalAuthenticatedRequest extends Request {
    user?: UserDto;
}
