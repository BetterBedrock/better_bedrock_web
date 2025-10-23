import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

export const useReviewAccess = () => {
    const navigate = useNavigate();
    const { throwError } = useNotification();
    const { user } = useAuth();
    const { selectedProject } = useProjectManager();

    useEffect(() => {
        if (!user?.admin) {
            navigate(Routes.PROJECT_PREVIEW + "/" + selectedProject?.id);
            throwError(null, "Only admins can review projects");
            return;
        }

        if (!selectedProject?.submitted) {
            navigate(Routes.HOME);
            throwError(null, "This project is no longer submitted");
        }
    }, [user, selectedProject]);

    const hasAccess = user?.admin && selectedProject?.submitted;

    return { hasAccess };
};