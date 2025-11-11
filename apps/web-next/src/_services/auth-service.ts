import { AuthApi } from "@/_lib/api";
import { axiosCustomInstance, baseApiConfig } from "@/_lib/client";

const authApi = new AuthApi(baseApiConfig, undefined, axiosCustomInstance);

export const authenticateRequest = (secret: string) => authApi.authControllerAuthenticate({
    headers: {
        Authorization: `Bearer ${secret}`
    }
});

export const googleAuthorize = (token: string) => authApi.authControllerGoogleAuthorize({
    token: token,
});