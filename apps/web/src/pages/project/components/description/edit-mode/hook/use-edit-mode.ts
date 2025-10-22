import { Content } from "@tiptap/react";
import { useState, useRef } from "react";
import { useProjectManager } from "~/pages/project/providers/project-manager";

export const useEditMode = () => {
    const { selectedProject, handleSaveProject, editorContent } = useProjectManager();
    const [fullScreen, setFullScreen] = useState(false);

    const saveTimer = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (data: Content | undefined) => {
        editorContent.current = data;

        if (saveTimer.current) clearTimeout(saveTimer.current);

        saveTimer.current = setTimeout(() => {
            if (selectedProject) handleSaveProject(selectedProject);
        }, 500);
    };

    const handleFullScreen = () => {
        setFullScreen((prev) => !prev);

        if (!fullScreen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    };
    return { handleFullScreen, handleChange, fullScreen, selectedProject };
}