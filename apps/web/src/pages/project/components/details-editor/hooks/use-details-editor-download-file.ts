import { useRef, useState } from "react";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";

export const useDetailsEditorDownloadFile = () => {
    const uploadFileRef = useRef<HTMLInputElement>(null);

    const { sendNotification, throwError } = useNotification();
    const { uploadFile } = useProject();
    const {
        selectedProject,
        setSelectedProject,
        fetchSelectedProject,
        handleSaveProject,
        checkIfSubmitted,
    } = useProjectManager();

    const [isUploading, setIsUploading] = useState(false);

    const uploadDownloadFile = async (file: File | undefined) => {
        if (!checkIfSubmitted()) return;
        if (!selectedProject || !file) return;

        try {
            setIsUploading(true);

            const uploadedFile = await uploadFile(selectedProject.id, file);
            if (!uploadedFile) return;

            const newProject = await fetchSelectedProject(selectedProject.id, true);
            setSelectedProject((prev) => ({
                ...prev!,
                downloadFile: newProject!.downloadFile,
                itemWeight: newProject!.itemWeight,
            }));

            sendNotification({
                title: "Uploaded",
                label: "Successfully uploaded download file",
                type: "success",
            });

            await handleSaveProject(selectedProject);
        } catch (err) {
            throwError(err, "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadDownloadFile, selectedProject, uploadFileRef, isUploading };
}