import { AuthApi } from "@/shared/lib/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/lib/utils";

const authApi = new AuthApi(baseApiConfig, undefined, axiosCustomInstance);

export const authenticateRequest = (secret: string) =>
    authApi.authControllerAuthenticate({
        headers: {
            Authorization: `Bearer ${secret}`,
        },
    });

export const googleAuthorizeRequest = (token: string) =>
    authApi.authControllerGoogleAuthorize({
        token: token,
    });
