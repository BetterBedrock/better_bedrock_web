"use client";

import clsx from "clsx";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { calculateItemDisplayWeight } from "@/utils/math";
import { useDetailsEditorDownloadFile } from "@/app/project/components/details-editor/hooks/use-details-editor-download-file";

import styles from "./details-editor.module.scss";

export const DetailsEditorDownloadFile = () => {
  const { selectedProject, uploadFileRef, uploadDownloadFile, isUploading } =
    useDetailsEditorDownloadFile();

  return (
    <div className={clsx(styles.editor, styles.size)}>
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
    </div>
  );
};
