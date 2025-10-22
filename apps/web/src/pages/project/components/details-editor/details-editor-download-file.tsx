import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { calcItemWeight } from "~/pages/downloads/components/better-bedrock";

import { styles, useDetailsEditorDownloadFile } from ".";

export const DetailsEditorDownloadFile = () => {
  const { selectedProject, uploadFileRef, uploadDownloadFile, isUploading } =
    useDetailsEditorDownloadFile();

  return (
    <div className={clsx(styles.editor, styles.size)}>
      <BedrockText
        text={
          selectedProject?.downloadFile
            ? `Selected File Size: ${calcItemWeight(selectedProject.itemWeight)}MB`
            : "No selected file yet"
        }
        type="p"
        color="white"
        textAlign="left"
      />
      <input
        className={styles.picker}
        ref={uploadFileRef}
        type="file"
        onChange={(e) => uploadDownloadFile(e.target.files?.[0])}
      />
      {isUploading ? (
        <CircularProgressIndicator size="small" center />
      ) : (
        <Button
          width="100%"
          type={selectedProject?.downloadFile ? "green" : "dark"}
          onClick={() => {
            uploadFileRef.current?.click();
          }}
          center
        >
          <BedrockText text="Upload Download File" type="p" color="white" />
        </Button>
      )}
    </div>
  );
};
