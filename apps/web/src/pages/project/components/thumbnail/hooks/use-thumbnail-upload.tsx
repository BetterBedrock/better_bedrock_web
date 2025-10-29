import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";

export const useThumbnailUpload = () => {
  const { uploadFile } = useProject();
  const { selectedProject, setSelectedProject, handleSaveProject, checkIfSubmitted } =
    useProjectManager();

  const handleUploadThumbnail = async (file: File) => {
    if (!checkIfSubmitted()) return;

    const uploadedFile = await uploadFile(selectedProject!.id, file);

    if (!uploadedFile) return;

    const newDraftProject = { ...selectedProject!, thumbnail: uploadedFile.fileUrl };
    setSelectedProject(newDraftProject);

    await handleSaveProject(newDraftProject);
  };

  return { selectedProject, handleUploadThumbnail };
};
