import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MonetizationType } from "@prisma/client";
import { webcrypto } from "crypto";
import { lastValueFrom } from "rxjs";
import { UserDto } from "~/user/dto/user.dto";
import { baseFrontendUrl } from "~/utils/url";

@Injectable()
export class MonetizationService {
    private readonly monetizationApiKey = process.env.MONETIZATION_API_KEY;
    private readonly monetizationApiMethod = process.env.MONETIZATION_API_METHOD;
    private readonly monetizationApiId = process.env.MONETIZATION_API_ID;

    constructor(private http: HttpService) {}

    resolveCreatorMonetization(creator: UserDto) {
        let finalSecret = this.monetizationApiKey;
        let finalMethod = this.monetizationApiMethod;
        let finalId = this.monetizationApiId;

        switch (creator.monetizationType) {
            case MonetizationType.linkvertise: {
                const { linkvertiseId, linkvertiseSecret } = creator;
                if (linkvertiseId && linkvertiseSecret) {
                    finalSecret = linkvertiseSecret;
                    finalId = linkvertiseId;
                    finalMethod = creator.monetizationType;
                }
                break;
            }

            case MonetizationType.lootlabs: {
                const { lootlabsSecret, lootlabsLinkId } = creator;
                if (lootlabsSecret && lootlabsLinkId) {
                    finalSecret = lootlabsSecret;
                    finalId = lootlabsLinkId;
                    finalMethod = creator.monetizationType;
                }
                break;
            }
        }

        return { finalSecret, finalMethod, finalId };
    }

    async linkvertiseVerifyHash(secret?: string, hash?: string) {
        const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${secret}&hash=${hash}`;

        try {
            const response$ = this.http.post(
                url,
                {}, // no body
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                },
            );
            const { data, status } = await lastValueFrom(response$);

            if (status !== 200 || !data.status) {
                throw new HttpException(
                    "Failed to verify with Linkvertise gateway.",
                    HttpStatus.BAD_GATEWAY,
                );
            }
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }

            throw new HttpException(
                "Linkvertise service unavailable.",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async linkvertiseEncodeUrl(linkvertiseId: string): Promise<string> {
        const targetUrl = baseFrontendUrl + "/verify";
        const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1piHDY9WRIehbfC3Fpol
    Ly/WrJF8TKFVdDMobj3fkNjN/69dTv9JgXt+gcJxVn/h4NCMtQ2mCQXNBMXzLOky
    HJipiFMoyPtOOlMlbWRAiaQE1GpMebGNRcsxYnWzF53v63+hUQgrMahH9X0Ii/NJ
    hvDyFlPX77+z9xiyd45L+xrgayePpOxvQpj6VJDlpNNKWbuIkFvkMmUVRM2TLulL
    JSgs4EgoBZgTYRpmhgR8tYfDOW+cOctffggcMAzKUC2CzYNmhzX15O7DKaZdYgfa
    BR/hqvyNAxBepHOJnBfHkQqaox5diHGqdwXXLwiJKzoK5R26vaI3jg2+d69VPSGL
    0QIDAQAB
    -----END PUBLIC KEY-----`;

        function str2ab(str: string): ArrayBuffer {
            const buf = new ArrayBuffer(str.length);
            const bufView = new Uint8Array(buf);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        }

        async function importKey(pem: string): Promise<webcrypto.CryptoKey> {
            const pemHeader = "-----BEGIN PUBLIC KEY-----";
            const pemFooter = "-----END PUBLIC KEY-----";
            const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1);
            const binaryDer = str2ab(atob(pemContents));
            return await crypto.subtle.importKey(
                "spki",
                binaryDer,
                { name: "RSA-OAEP", hash: "SHA-256" },
                false,
                ["encrypt"],
            );
        }

        const encodedHref = new TextEncoder().encode(targetUrl);

        // Split into two parts like the official script
        let part1: webcrypto.BufferSource, part2: string;
        if (encodedHref.length > 70) {
            part1 = encodedHref.slice(0, 70);
            part2 = new TextDecoder().decode(encodedHref.slice(70));
        } else {
            part1 = encodedHref;
            part2 = "";
        }

        const key = await importKey(pemEncodedKey);
        const encryptedHref = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, part1);

        // Convert encrypted part to base64
        let binary = "";
        const bytes = new Uint8Array(encryptedHref);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const encryptedBase64 = btoa(binary);

        const fullEncryptedHref = `${encryptedBase64}${part2}`;
        const baseLinkvertiseUrl = `https://link-to.net/${linkvertiseId}/${Math.floor(Math.random() * 1000)}/dynamic/`;

        return `${baseLinkvertiseUrl}?r=${fullEncryptedHref}&v=2`;
    }

    async lootlabsEncodeUrl(secret?: string, hash?: string): Promise<string> {
        const baseUrl = `https://creators.lootlabs.gg/api/public/url_encryptor`;

        try {
            const response$ = this.http.post(
                baseUrl,
                {
                    destination_url: baseFrontendUrl + "/verify?hash=" + hash,
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        Authorization: "Bearer " + secret,
                    },
                },
            );
            const { data, status } = await lastValueFrom(response$);
            Logger.error({ data, status });

            if (status !== 200 || !data.message) {
                throw new HttpException(
                    "Failed to generate with Lootlabs gateway.",
                    HttpStatus.BAD_GATEWAY,
                );
            }

            return data?.message;
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }

            Logger.error(err);

            throw new HttpException(
                "Lootlabs service unavailable.",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
