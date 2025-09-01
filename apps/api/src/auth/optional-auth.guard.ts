import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "~/prisma.service";
import { extractTokenFromHeader } from "~/utils/string";

@Injectable()
export class OptionalAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);

        if (!token) {
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });

            const user = await this.prismaService.user.findFirst({ where: { id: payload.uId } });

            if (user && !user.banned) {
                request["user"] = user;
            }
        } catch {
            // Invalid token, proceed as guest
        }
        return true;
    }
}
