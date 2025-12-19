import { useAuth } from "@/providers/auth";

export const useHandleGoogleLogin = () => {
    const { googleLogin } = useAuth();

    const handleGoogleLoginButtonClick = async () => {
        googleLogin();
    };

    return handleGoogleLoginButtonClick;
};