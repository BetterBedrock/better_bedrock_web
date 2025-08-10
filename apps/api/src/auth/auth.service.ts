import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import jwt from "jsonwebtoken";
import { AuthorizeDto } from "~/auth/dto/authorize.dto";
import { GoogleAccountDto } from "~/auth/dto/google-account.dto";
import { JwtTokenDto } from "~/auth/dto/jwt-token.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }

    async authorize(data: AuthorizeDto): Promise<JwtTokenDto> {
        const googleAccount = await this.fetchGoogleAccountInfo(data.token);

        if (!googleAccount || !googleAccount.email) {
            throw new BadRequestException("Invalid Google token or missing account email.");
        }

        const { sub: googleId, email, name: googleName } = googleAccount;

        let user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ email }, { googleId }],
            },
        });

        Logger.error(googleAccount);

        if (!user) {
            const randomName = await this.generateRandomName(googleName || "user");
            user = await this.prismaService.user.create({
                data: {
                    name: randomName,
                    email,
                    bio: "",
                    googleId,
                },
            });
        }

        // Generate JWT for both login and registration
        const token = jwt.sign({ uId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });

        return { token, isNewUser: !user.id };
    }

    private async fetchGoogleAccountInfo(token: string): Promise<GoogleAccountDto> {
        try {
            const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                throw new BadRequestException("Invalid Google token or token expired.");
            }

            return (await res.json()) as GoogleAccountDto;
        } catch (err) {
            Logger.error(err);
            throw new InternalServerErrorException("Error fetching Google account info.");
        }
    }

    private async generateRandomName(baseName: string): Promise<string> {
        const cleanName = baseName
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, 15)
            .toLowerCase();

        let username: string;
        let exists = true;

        // Try until we find a unique username
        do {
            const randomSuffix = Math.floor(Math.random() * 10000) // 0 - 9999
                .toString()
                .padStart(4, "0");
            username = `${cleanName}${randomSuffix}`;

            const existingUser = await this.prismaService.user.findFirst({
                where: { name: username },
                select: { id: true },
            });

            exists = !!existingUser;
        } while (exists);

        return username;
    }
}
