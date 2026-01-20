import { ProjectType } from "@/shared/api/openapi";
import { useProjectManager } from "@/shared/model/project-manager";

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
