import { TagNameDto } from "@/lib/api";
import { useNotification } from "@/providers/notification";
import { useProjectManager } from "@/app/(projects)/project/providers/project-manager";
import { KeyboardEvent, useRef } from "react";

export const useDetailsEditorTags = () => {
  const { throwError } = useNotification();
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { selectedProject, setSelectedProject, handleSaveProject, checkIfSubmitted } =
    useProjectManager();

  const handleCreateTag = async () => {
    if (!checkIfSubmitted()) return;

    const tagName = tagInputRef.current?.value.trim();

    if (selectedProject!.tags.find((t) => t.name === tagName)) {
      throwError(null, "Tag with this name is already attached to this project");
      return;
    }

    if (!tagName) return;
    const newSelectedProject = {
      ...selectedProject!,
      tags: [...(selectedProject?.tags ?? []), { name: tagName }],
    };

    const updateProject = await handleSaveProject(newSelectedProject);

    if (!updateProject) {
      return;
    }

    setSelectedProject(newSelectedProject);

    if (!tagInputRef.current) return;
    tagInputRef.current.value = "";
  };

  const handleDeleteTag = async (tag: TagNameDto) => {
    if (!checkIfSubmitted()) return;

    const newProject = {
      ...selectedProject!,
      tags: selectedProject?.tags.filter((existingTag) => existingTag.name !== tag.name) ?? [],
    };
    setSelectedProject(newProject);
    await handleSaveProject(newProject);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTag();
    }
  };
  return { selectedProject, tagInputRef, handleCreateTag, handleKeyDown, handleDeleteTag };
};
