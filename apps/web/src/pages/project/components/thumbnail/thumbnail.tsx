import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { baseUrl } from "~/utils/url";
import { useProject } from "~/providers/project";
import { HeaderTitle } from "~/pages/project/components/header";

export const Thumbnail = () => {
  const { uploadFile } = useProject();
  const { selectedProject, setSelectedProject, handleSaveProject } = useProjectManager();

  const handleUploadThumbnail = async (file: File) => {
    if (!selectedProject) return;
    const uploadedFile = await uploadFile(selectedProject.id, file);
    if (!uploadedFile) return;
    const newDraftProject = { ...selectedProject, thumbnail: uploadedFile.fileUrl };
    setSelectedProject(newDraftProject);

    await handleSaveProject(newDraftProject);
  };

  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Thumbnail" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <ImagePlaceholder
          onUpload={handleUploadThumbnail}
          src={selectedProject?.thumbnail ? baseUrl + "/" + selectedProject!.thumbnail : undefined}
        />
      </div>
    </Card>
  );
};
