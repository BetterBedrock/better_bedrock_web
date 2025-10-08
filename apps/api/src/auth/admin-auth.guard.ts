import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "~/prisma.service";
import { extractTokenFromHeader } from "~/utils/string";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });

            const user = await this.prisma.user.findFirstOrThrow({ where: { id: payload.uId } });

            if (user.banned) {
                throw new ForbiddenException("This user is banned");
            }

            if (!user.admin) {
                throw new UnauthorizedException("This user is not admin");
            }

            request["user"] = user;
        } catch {
            throw new UnauthorizedException("Could not authenticate");
        }
        return true;
    }
}
