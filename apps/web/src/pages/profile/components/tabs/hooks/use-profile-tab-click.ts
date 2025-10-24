import { useParams, useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";

export const useProfileTabClick = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        navigate(Routes.PROFILE + "/" + id + "/" + tab);
    };

    return handleTabClick;
};