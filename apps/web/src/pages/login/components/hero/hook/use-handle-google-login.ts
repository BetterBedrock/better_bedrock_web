import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/providers/auth";
import { Routes } from "~/utils/routes";

export const useHandleGoogleLogin = () => {
    const navigate = useNavigate();

    const { user, googleLogin } = useAuth();

    const handleGoogleLoginButtonClick = async () => {
        googleLogin();
    };

    useEffect(() => {
        if (user) {
            navigate(Routes.PROFILE + `/${user.name}`);
        }
    }, [user]);

    return handleGoogleLoginButtonClick;
};