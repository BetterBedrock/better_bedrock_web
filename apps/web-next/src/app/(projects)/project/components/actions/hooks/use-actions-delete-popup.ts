"use client";

import { useNotification } from "@/providers/notification";
import { useProject } from "@/providers/project";
import { useProjectManager } from "@/app/(projects)/project/providers/project-manager";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useActionsDeletePopup = () => {
    const router = useRouter();
    const { sendNotification } = useNotification();
    const [existsProductionProject, setExistsProductionProject] = useState<boolean | undefined>(
        undefined,
    );

    const [deleteEverything, setDeleteEverything] = useState(false);
    const [deletePublishedOnly, setDeletePublishedOnly] = useState(false);

    const { selectedProject } = useProjectManager();
    const { deleteProject, deleteProductionProject, fetchProjectDetails } = useProject();

    useEffect(() => {
        fetchProjectDetails(selectedProject!.id, false).then((data) =>
            setExistsProductionProject(!!data),
        );
    }, []);

    const isLoading = existsProductionProject === undefined;

    const disableDeleteButton = isLoading
        ? true
        : existsProductionProject
            ? !deleteEverything && !deletePublishedOnly
            : false;

    const deleteOption = !existsProductionProject
        ? deleteEverything
        : deletePublishedOnly
            ? deletePublishedOnly
            : deleteEverything;

    const handleDelete = async (publicOnly?: boolean) => {
        if (!selectedProject) return;

        if (publicOnly) {
            await deleteProductionProject(selectedProject.id, selectedProject.title);
        } else {
            await deleteProject(selectedProject.id, selectedProject.title);
        }

        sendNotification({
            title: "Deleted",
            label: "Successfully deleted project",
            type: "success",
        });

        router.push(Routes.HOME);
    };

    return { isLoading, deletePublishedOnly, existsProductionProject, deleteEverything, setDeleteEverything, setDeletePublishedOnly, disableDeleteButton, handleDelete, deleteOption };
};