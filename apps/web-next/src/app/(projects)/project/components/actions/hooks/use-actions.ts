"use client";

import { useProject } from "@/_providers/project";
import { useProjectManager } from "@/app/(projects)/project/providers/project-manager";

export const useActions = () => {
    const { submitProject, cancelSubmission } = useProject();
    const { handleSaveProject, selectedProject, setSelectedProject } = useProjectManager();

    const handleSubmission = async () => {
        if (!selectedProject) return;

        if (!selectedProject.submitted) {
            await handleSaveProject(selectedProject);
            const submission = await submitProject(selectedProject.id, selectedProject.title);

            if (!submission) return;
            setSelectedProject((prev) => ({ ...prev!, submitted: true, error: null }));
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            await cancelSubmission(selectedProject.id, selectedProject.title);
            setSelectedProject((prev) => ({ ...prev!, submitted: false }));
        }
    };

    return { handleSubmission, selectedProject, handleSaveProject };
};