"use client";

import { useNotification } from "@/providers/notification";
import { useActions } from "./use-actions";

export const useActionsSave = () => {
  const { sendNotification } = useNotification();
  const { selectedProject, handleSaveProject } = useActions();

  const saveProject = async () => {
    if (!selectedProject) return false;
    await handleSaveProject(selectedProject);
    sendNotification({
      type: "info",
      label: "Project has been saved",
      title: selectedProject.title,
    });
    return true;
  };

  return { saveProject };
};
