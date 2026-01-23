import { useProjectManager } from "@/app/providers/project-manager";
import { ProjectType } from "@/shared/lib/openapi";

export const useDetailsEditorProjectType = () => {
    const {
        selectedProject,
        setSelectedProject,
        handleSaveProject,
        checkIfSubmitted,
    } = useProjectManager();

    const handleUpdateType = async (key: string) => {
        if (!checkIfSubmitted()) return;

        const newProject = { ...selectedProject!, type: key as ProjectType };
        setSelectedProject(newProject);
        await handleSaveProject(newProject);
    };

    return { handleUpdateType, selectedProject };
};
