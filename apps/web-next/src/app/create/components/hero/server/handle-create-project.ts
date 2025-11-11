"use server";

import { createProject } from "@/_lib/projects/create-project"
import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export const handleCreateProject = async (title: string) => {
    const project = await createProject(title);
    if (!project) return;
    redirect(Routes.PROJECT_EDIT + "/" + project.id)
}