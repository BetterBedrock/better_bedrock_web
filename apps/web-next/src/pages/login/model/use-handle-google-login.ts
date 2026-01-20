import { useAuth } from "@/shared/model/auth";

export const useHandleGoogleLogin = () => {
    const { googleLogin } = useAuth();

    const handleGoogleLoginButtonClick = async () => {
        googleLogin();
    };

    return handleGoogleLoginButtonClick;
};
