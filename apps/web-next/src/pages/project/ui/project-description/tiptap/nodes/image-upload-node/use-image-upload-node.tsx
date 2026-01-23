"use client";

import { isValidPosition } from "@/pages/project/ui/project-description/tiptap/tiptap-utils";
import { useNotification } from "../../../../../../../../app/providers/notification";
import { NodeViewProps } from "@tiptap/react";
import { useRef, useState } from "react";

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  abortController?: AbortController;
}

export interface UploadOptions {
  props: NodeViewProps;
}

const maxSize = 100 * 1024 * 1024;

export const useFileUpload = ({ props }: UploadOptions) => {
  const { limit } = props.node.attrs;
  const inputRef = useRef<HTMLInputElement>(null);
  const extension = props.extension;
  const options = extension.options;

  const { onError, onSuccess, upload } = options;

  const { throwError } = useNotification();

  const [fileItems, setFileItems] = useState<FileItem[]>([]);

  const uploadFile = async (file: File): Promise<string | undefined> => {
    if (file.size > maxSize) {
      throwError(
        null,
        `File size exceeds maximum allowed (${maxSize / 1024 / 1024}MB)`,
      );
      return;
    }

    const abortController = new AbortController();
    const fileId = crypto.randomUUID();

    const newFileItem: FileItem = {
      id: fileId,
      file,
      progress: 0,
      status: "uploading",
      abortController,
    };

    setFileItems((prev) => [...prev, newFileItem]);

    try {
      if (!upload) {
        throw new Error("Upload function is not defined");
      }

      const url = await upload(
        file,
        (event: { progress: number }) => {
          setFileItems((prev) =>
            prev.map((item) =>
              item.id === fileId ? { ...item, progress: event.progress } : item,
            ),
          );
        },
        abortController.signal,
      );

      if (!url) throw new Error("Upload failed: No URL returned");

      if (!abortController.signal.aborted) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? { ...item, status: "success", url, progress: 100 }
              : item,
          ),
        );
        onSuccess?.(url);
        return url;
      }

      return;
    } catch (error) {
      if (!abortController.signal.aborted) {
        onError?.(error instanceof Error ? error : new Error("Upload failed"));
      }
      return;
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
      onError?.(new Error("No files to upload"));
      return [];
    }

    if (limit && files.length > limit) {
      onError?.(
        new Error(`Maximum ${limit} file${limit === 1 ? "" : "s"} allowed`),
      );
      return [];
    }

    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);

    return results.filter(
      (url): url is string => url !== null && url !== undefined,
    );
  };

  const handleUpload = async (files: File[]) => {
    const urls = await uploadFiles(files);

    if (urls.length > 0) {
      const pos = props.getPos();

      if (isValidPosition(pos)) {
        const imageNodes = urls.map((url, index) => {
          const filename =
            files[index]?.name.replace(/\.[^/.]+$/, "") || "unknown";
          return {
            type: "image",
            attrs: { src: url, alt: filename, title: filename },
          };
        });

        props.editor
          .chain()
          .focus()
          .deleteRange({ from: pos, to: pos + 1 })
          .insertContentAt(pos, imageNodes)
          .run();
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current && fileItems.length === 0) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  return {
    handleUpload,
    handleClick,
  };
};
