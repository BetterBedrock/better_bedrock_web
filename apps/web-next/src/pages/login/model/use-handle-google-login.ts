import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthorizeRequest } from "@/entities/auth/api/auth-service";
import { useAuth } from "@/app/providers/auth";
import { useNotification } from "@/app/providers/notification";

export const useHandleGoogleLogin = () => {
    const { throwError } = useNotification();
    const { authenticate } = useAuth();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { data } = await googleAuthorizeRequest(
                    tokenResponse.access_token,
                );

                authenticate(data.token);
            } catch (err) {
                throwError(err, "Failed to login with Google");
            }
        },
        onError: (errorResponse) =>
            throwError(errorResponse, "Failed to login with Google"),
    });

    return () => login();
};
