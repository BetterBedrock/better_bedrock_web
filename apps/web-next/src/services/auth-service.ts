import { AuthApi } from "@/lib/api";
import { axiosCustomInstance, baseApiConfig } from "@/lib/client";

const authApi = new AuthApi(baseApiConfig, undefined, axiosCustomInstance);

export const authenticateRequest = (secret: string) => authApi.authControllerAuthenticate({
    headers: {
        Authorization: `Bearer ${secret}`
    }
});

export const googleAuthorize = (token: string) => authApi.authControllerGoogleAuthorize({
    token: token,
});