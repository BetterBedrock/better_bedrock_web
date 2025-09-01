import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";

import { Request } from "express";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const secret = process.env.ADMIN_PANEL_SECRET;

        if (!secret || secret == "") {
            throw new InternalServerErrorException("Secret for admin panel is not set");
        }

        if (!token || token !== process.env.ADMIN_PANEL_SECRET) {
            throw new UnauthorizedException("Could not authenticate");
        }
        return true;
    }
}
