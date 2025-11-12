"use client";

import { useNotification } from "@/_providers/notification";
import { useProject } from "@/_providers/project";
import { useProjectManager } from "@/app/project/providers/project-manager";
import { useRef, useState } from "react";

export const useDetailsEditorDownloadFile = () => {
    const uploadFileRef = useRef<HTMLInputElement>(null);

    const { sendNotification, throwError } = useNotification();
    const { uploadFile } = useProject();
    const {
        selectedProject,
        setSelectedProject,
        handleSaveProject,
        checkIfSubmitted, detailedProject
    } = useProjectManager();

    const [isUploading, setIsUploading] = useState(false);

    const uploadDownloadFile = async (file: File | undefined) => {
        if (!checkIfSubmitted()) return;
        if (!selectedProject || !file) return;

        try {
            setIsUploading(true);

            const uploadedFile = await uploadFile(selectedProject.id, file);
            if (!uploadedFile) return;

            setSelectedProject((prev) => ({
                ...prev!,
                downloadFile: detailedProject!.downloadFile,
                itemWeight: detailedProject!.itemWeight,
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