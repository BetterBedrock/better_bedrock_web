import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useAuth } from "~/providers/auth";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";

export const useFetchUserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { findUserByName } = useUser();
    const { user } = useAuth();
    const { fetchDetails, setSelectedUser, fetchedDetailedUser } = useUserProfile();

    const fetchSelectedUser = async (id: string) => {
        const data = await findUserByName(id);
        if (!data) {
            navigate(Routes.HOME);
            return;
        }
        setSelectedUser(data);
        await fetchDetails(data);
    };

    useEffect(() => {
        if (!id) {
            navigate(Routes.HOME);
            return;
        }
        fetchSelectedUser(id);
    }, [id, user?.admin]);

    return { fetchedDetailedUser };
};