"use server";

import { createProject } from "@/entities/project/api/create-project";
import { Routes } from "@/shared/model/routes";
import { redirect } from "next/navigation";

export const handleCreateProject = async (title: string) => {
    const project = await createProject(title);
    if (!project) return;
    redirect(Routes.PROJECT_EDIT + "/" + project.id);
};
