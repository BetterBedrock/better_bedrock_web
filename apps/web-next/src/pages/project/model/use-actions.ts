"use client";

import { cancelProject } from "@/entities/project";
import { submitProject } from "@/entities/project";
import { useNotification } from "@/app/providers/notification";
import { useRouter } from "next/navigation";
import { useProjectManager } from "@/app/providers/project-manager";

export const useActions = () => {
    const router = useRouter();
    const { sendNotification, throwError } = useNotification();
    const { handleSaveProject, selectedProject, setSelectedProject } =
        useProjectManager();

    const handleSubmission = async () => {
        if (!selectedProject) return;

        if (!selectedProject.submitted) {
            await handleSaveProject(selectedProject);
            const { error } = await submitProject(selectedProject.id);
            if (error) {
                throwError(null, error);
                return;
            }

            sendNotification({
                type: "info",
                title: selectedProject.title,
                label: "Project has been submitted for review",
            });

            setSelectedProject((prev) => ({
                ...prev!,
                submitted: true,
                error: null,
            }));
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            const { error } = await cancelProject(selectedProject.id);
            if (error) {
                throwError(null, error);
                return;
            }

            sendNotification({
                type: "info",
                title: selectedProject.title,
                label: "Project has been submitted for review",
            });

            setSelectedProject((prev) => ({ ...prev!, submitted: false }));
        }

        router.refresh();
    };

    return { handleSubmission, selectedProject, handleSaveProject };
};
