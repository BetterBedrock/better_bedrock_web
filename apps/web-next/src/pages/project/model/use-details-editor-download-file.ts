import { useProjectManager } from "@/app/providers/project-manager";
import { useNotification } from "../../../../app/providers/notification";
import { useRef, useState } from "react";
import { uploadFile } from "@/entities/project";

export const useDetailsEditorDownloadFile = () => {
    const uploadFileRef = useRef<HTMLInputElement>(null);

    const { sendNotification, throwError } = useNotification();
    const {
        selectedProject,
        setSelectedProject,
        handleSaveProject,
        checkIfSubmitted,
    } = useProjectManager();

    const [isUploading, setIsUploading] = useState(false);

    const uploadDownloadFile = async (file: File | undefined) => {
        if (!checkIfSubmitted()) return;
        if (!selectedProject || !file) return;

        setIsUploading(true);

        const { data, error } = await uploadFile(selectedProject.id, file);

        if (error) {
            throwError(null, error);
            setIsUploading(false);
            return;
        }

        setSelectedProject((prev) => ({
            ...prev!,
            downloadFile: data.fileUrl,
            itemWeight: file.size * 0.000001,
        }));

        sendNotification({
            title: "Uploaded",
            label: "Successfully uploaded download file",
            type: "success",
        });

        await handleSaveProject(selectedProject);
        setIsUploading(false);
    };

    return { uploadDownloadFile, selectedProject, uploadFileRef, isUploading };
};
