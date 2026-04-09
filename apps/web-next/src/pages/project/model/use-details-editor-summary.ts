import { useEffect, useState } from "react";
import { useProjectManager } from "@/app/providers/project-manager";

export const useDetailsEditorSummary = () => {
  const {
    selectedProject,
    setSelectedProject,
    handleSaveProject
  } = useProjectManager();

  const [summary, setSummary] = useState(selectedProject.summary ?? "");


  useEffect(() => {
    if(!summary || summary === selectedProject.summary) return;

    const timeout = setTimeout(async () => {
      const newProject = { ...selectedProject!, summary };
      setSelectedProject(newProject);

      await handleSaveProject(newProject);
    }, 500)

    return () => clearTimeout(timeout);
  }, [summary]);

  return {
    selectedProject,
    summary,
    setSummary
  };
};
