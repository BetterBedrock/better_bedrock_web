import { useProjectManager } from "@/shared/model/project-manager";
import { uploadFile } from "@/entities/project/api/upload-file";
import { useNotification } from "@/shared/model/notification";

export const useThumbnailUpload = () => {
  const { throwError, sendNotification } = useNotification();
  const {
    selectedProject,
    setSelectedProject,
    handleSaveProject,
    checkIfSubmitted,
  } = useProjectManager();

  const handleUploadThumbnail = async (file: File) => {
    if (!checkIfSubmitted()) return;

    const { error, data } = await uploadFile(selectedProject!.id, file);
    if (error) {
      throwError(null, error);
      return;
    }

    const newDraftProject = {
      ...selectedProject!,
      thumbnail: data.fileUrl,
    };
    setSelectedProject(newDraftProject);

    sendNotification({
      title: "Uploaded",
      label: "Successfully uploaded thumbnail",
      type: "success",
    });

    await handleSaveProject(newDraftProject);
  };

  return { selectedProject, handleUploadThumbnail };
};
