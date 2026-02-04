"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { calculateItemDisplayWeight } from "@/shared/lib/utils";
import { useDetailsEditorDownloadFile } from "@/pages/project/model/use-details-editor-download-file";

import styles from "./project-details-editor.module.scss";
import { Card } from "@/shared/ui/card";

export const ProjectDetailsEditorDownloadFile = () => {
  const { selectedProject, uploadFileRef, uploadDownloadFile, isUploading } =
    useDetailsEditorDownloadFile();

  return (
    <Card.Item>
      <BedrockText
        text={
          selectedProject?.downloadFile
            ? `Selected File Size: ${calculateItemDisplayWeight(selectedProject.itemWeight)}MB`
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
    </Card.Item>
  );
};
