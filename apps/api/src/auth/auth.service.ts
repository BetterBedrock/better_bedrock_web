import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { AuthorizeDto } from "~/auth/dto/authorize.dto";
import { GoogleAccountDto } from "~/auth/dto/google-account.dto";
import { JwtTokenDto } from "~/auth/dto/jwt-token.dto";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

const bootstrapAdmins = ["matikuki3@gmail.com", "axmbro@gmail.com"];

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private http: HttpService,
    ) {}

    async googleAuthorize(data: AuthorizeDto): Promise<JwtTokenDto> {
        const googleAccount = await this.fetchGoogleAccountInfo(data.token);

        if (!googleAccount || !googleAccount.email) {
            throw new BadRequestException("Invalid Google token or missing account email");
        }

        const { sub: googleId, email, name: googleName } = googleAccount;

        let user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ email }, { googleId }],
            },
        });

        const isNewUser = !user?.id;

        if (!user) {
            const randomName = await this.generateRandomName(googleName || "user");
            user = await this.prismaService.user.create({
                data: {
                    name: randomName,
                    email,
                    bio: "",
                    googleId,
                    admin: bootstrapAdmins.includes(email.toLowerCase()),
                },
            });
        }

        if (bootstrapAdmins.includes(email.toLowerCase())) {
            await this.prismaService.user.update({
                where: { email },
                data: {
                    admin: true,
                },
            });
        }

        const token = this.jwtService.sign({ uId: user.id });

        return { token, isNewUser };
    }

    private async fetchGoogleAccountInfo(token: string): Promise<GoogleAccountDto | undefined> {
        try {
            const response$ = this.http.get<GoogleAccountDto>(
                "https://openidconnect.googleapis.com/v1/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                },
            );

            const { data } = await lastValueFrom(response$);
            return data;
        } catch (_) {
            return;
        }
    }

    private async generateRandomName(baseName: string): Promise<string> {
        const cleanName = baseName
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, 15)
            .toLowerCase();

        let username: string;
        let exists = true;

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
