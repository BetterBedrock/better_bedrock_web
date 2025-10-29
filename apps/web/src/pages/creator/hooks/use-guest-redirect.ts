import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/providers/auth";
import { Routes } from "~/utils/routes";

export const useGuestRedirect = () => {
    const { user, fetched } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && fetched) {
            navigate(Routes.LINKVERTISE);
        }
    }, [user, fetched]);
};