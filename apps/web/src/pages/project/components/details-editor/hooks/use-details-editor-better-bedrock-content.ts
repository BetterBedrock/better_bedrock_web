import { useProjectManager } from "~/pages/project/providers/project-manager";

export const useDetailsEditorBetterBedrockContent = () => {
    const { selectedProject, setSelectedProject, handleSaveProject, checkIfSubmitted } =
        useProjectManager();

    const handleSwitchBetterBedrock = async () => {
        if (!checkIfSubmitted()) return;

        const newProject = {
            ...selectedProject!,
            betterBedrockContent: !selectedProject?.betterBedrockContent,
        };
        setSelectedProject(newProject);
        await handleSaveProject(newProject);
    };

    return { handleSwitchBetterBedrock, selectedProject };
};