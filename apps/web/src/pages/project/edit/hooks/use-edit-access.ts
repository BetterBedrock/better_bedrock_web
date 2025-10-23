import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

export const useEditAccess = () => {
    const navigate = useNavigate();
    const { throwError } = useNotification();
    const { user } = useAuth();
    const { selectedProject } = useProjectManager();

    const hasAccess = !(user?.id !== selectedProject!.userId && !user?.admin);

    useEffect(() => {
        if (!hasAccess) {
            navigate(Routes.PROJECT_PREVIEW + "/" + selectedProject?.id);
            throwError(null, "You don't have access to edit this project");
        }
    }, [selectedProject, user]);

    return { hasAccess: hasAccess }
}