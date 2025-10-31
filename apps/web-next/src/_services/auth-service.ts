import { AuthApi } from "@/_lib/api";
import { baseApiConfig } from "@/_lib/client";

const authApi = new AuthApi(baseApiConfig);

export const authenticateRequest = (secret: string) => authApi.authControllerAuthenticate({
    headers: {
        Authorization: `Bearer ${secret}`
    }
});

export const googleAuthorize = (token: string) => authApi.authControllerGoogleAuthorize({
    token: token,
});