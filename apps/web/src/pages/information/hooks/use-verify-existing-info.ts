import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";

import { informationData } from "~/pages/information/data";

export const useVerifyExistingInfo = () => {
    const { category } = useParams();

    const navigate = useNavigate();

    if (!category) {
        navigate(Routes.INFORMATION + "/" + informationData[0].id);
    }

    useEffect(() => {
        if (!informationData.find((c) => c.id === category)) {
            navigate(Routes.INFORMATION + "/" + informationData[0].id);
        }
    }, [category]);
};