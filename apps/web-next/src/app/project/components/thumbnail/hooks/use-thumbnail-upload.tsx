import { useProject } from "@/_providers/project";
import { useProjectManager } from "@/app/project/providers/project-manager";

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
