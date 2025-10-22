import { useDownload } from "~/providers/download";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";


export const useDownloadButton = () => {
    const { user } = useAuth();
    const { generateDownload } = useDownload();
    const { selectedProject, downloadButtonRef } = useProjectManager();

    const instantDownload = selectedProject!.userId === user?.id || user?.admin;

    const navigate = useNavigate();

    const handleDownload = async () => {
        if (!instantDownload) {
            return;
        }

        await generateDownload(selectedProject!);
        navigate(Routes.FETCH);
    };

    return { handleDownload, downloadButtonRef, selectedProject, instantDownload }
}