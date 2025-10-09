import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { baseUrl } from "~/utils/url";
import { useProject } from "~/providers/project";
import { HeaderTitle } from "~/pages/project/components/header";
import { useNotification } from "~/providers/notification";
import { SubmittedOverlay } from "../submitted-overlay";

export const Thumbnail = () => {
  const { uploadFile } = useProject();
  const { selectedProject, setSelectedProject, handleSaveProject } = useProjectManager();
  const { throwError } = useNotification();

  const handleUploadThumbnail = async (file: File) => {
    if (!selectedProject || !checkIfSubmitted()) return;
    const uploadedFile = await uploadFile(selectedProject.id, file);
    if (!uploadedFile) return;
    const newDraftProject = { ...selectedProject, thumbnail: uploadedFile.fileUrl };
    setSelectedProject(newDraftProject);

    await handleSaveProject(newDraftProject);
  };

  const checkIfSubmitted = () => {
    if (selectedProject?.submitted) {
      throwError(
        null,
        "The project has already been submitted, you cannot make any changes unless you cancel submission",
      );
      return false;
    }

    return true;
  };

  return (
    <Card sub style={{ position: "relative" }}>
      {selectedProject!.submitted && (
        <SubmittedOverlay />
      )}
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
