import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

export const useActionsDeletePopup = () => {
    const navigate = useNavigate();
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

        navigate(Routes.HOME);
    };

    return { isLoading, deletePublishedOnly, existsProductionProject, deleteEverything, setDeleteEverything, setDeletePublishedOnly, disableDeleteButton, handleDelete, deleteOption };
};