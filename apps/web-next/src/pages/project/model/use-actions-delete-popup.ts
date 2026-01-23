"use client";

import { useNotification } from "@/app/providers/notification";
import { Routes } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchProjectDetails } from "@/entities/project";
import { deleteProductionProject } from "@/entities/project";
import { deleteProject } from "@/entities/project";
import { useProjectManager } from "@/app/providers/project-manager";

export const useActionsDeletePopup = () => {
    const router = useRouter();
    const { sendNotification, throwError } = useNotification();
    const [existsProductionProject, setExistsProductionProject] = useState<
        boolean | undefined
    >(undefined);

    const [deleteEverything, setDeleteEverything] = useState(false);
    const [deletePublishedOnly, setDeletePublishedOnly] = useState(false);

    const { selectedProject } = useProjectManager();

    useEffect(() => {
        fetchProjectDetails(selectedProject!.id).then((request) =>
            setExistsProductionProject(!!request.data),
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
            const { error } = await deleteProductionProject(selectedProject.id);

            if (error) {
                throwError(null, error);
                return;
            }

            sendNotification({
                type: "info",
                title: selectedProject.title,
                label: "The public version of this project has been deleted",
            });
        } else {
            const { error } = await deleteProject(selectedProject.id);

            if (error) {
                throwError(null, error);
                return;
            }

            sendNotification({
                type: "info",
                title: selectedProject.title,
                label: "The project has been deleted",
            });
        }

        sendNotification({
            title: "Deleted",
            label: "Successfully deleted project",
            type: "success",
        });

        router.push(Routes.HOME);
    };

    return {
        isLoading,
        deletePublishedOnly,
        existsProductionProject,
        deleteEverything,
        setDeleteEverything,
        setDeletePublishedOnly,
        disableDeleteButton,
        handleDelete,
        deleteOption,
    };
};
