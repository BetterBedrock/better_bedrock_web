import { Request } from "express";
import { UserDto } from "~/user/dto/user.dto";

export interface AuthenticatedRequest extends Request {
    user: UserDto;
}
