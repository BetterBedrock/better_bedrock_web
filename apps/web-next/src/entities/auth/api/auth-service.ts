import { AuthApi } from "@/shared/api/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/api/client";

const authApi = new AuthApi(baseApiConfig, undefined, axiosCustomInstance);

export const authenticateRequest = (secret: string) =>
    authApi.authControllerAuthenticate({
        headers: {
            Authorization: `Bearer ${secret}`,
        },
    });

export const googleAuthorize = (token: string) =>
    authApi.authControllerGoogleAuthorize({
        token: token,
    });
