"use server";

import { createProject } from "@/features/project/server/create-project"
import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export const handleCreateProject = async (title: string) => {
    const project = await createProject(title);
    if (!project) return;
    redirect(Routes.PROJECT_EDIT + "/" + project.id)
}