"use client";

import { type Editor } from "@tiptap/react";

import ImagePlusIcon from "@/public/ui/tiptap-icons/14.png";
import { useState, useEffect, useCallback } from "react";
import { TiptapIcon } from "@/_components/tiptap/tiptap-icon";
import { isExtensionAvailable, isNodeTypeSelected } from "@/_lib/tiptap-utils";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

/**
 * Configuration for the image upload functionality
 */
export interface UseImageUploadConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Whether the button should hide when insertion is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called after a successful image insertion.
   */
  onInserted?: () => void;
}

/**
 * Checks if image can be inserted in the current editor state
 */
export function canInsertImage(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  if (
    !isExtensionAvailable(editor, "imageUpload") ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false;

  return editor.can().insertContent({ type: "imageUpload" });
}

/**
 * Checks if image is currently active
 */
export function isImageActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("imageUpload");
}

/**
 * Inserts an image in the editor
 */
export function insertImage(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canInsertImage(editor)) return false;

  try {
    return editor
      .chain()
      .focus()
      .insertContent({
        type: "imageUpload",
      })
      .run();
  } catch {
    return false;
  }
}

/**
 * Determines if the image button should be shown
 */
export function shouldShowButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, hideWhenUnavailable } = props;

  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "imageUpload")) return false;

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertImage(editor);
  }

  return true;
}

export function useImageUpload(config?: UseImageUploadConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted,
  } = config || {};

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canInsert = canInsertImage(editor);
  const isActive = isImageActive(editor);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }));
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);

  const handleImage = useCallback(() => {
    if (!editor) return false;

    const success = insertImage(editor);
    if (success) {
      onInserted?.();
    }
    return success;
  }, [editor, onInserted]);

  return {
    isVisible,
    isActive,
    handleImage,
    canInsert,
    label: "Add image",
    Icon: (
      <TiptapIcon icon={ImagePlusIcon.src} className="tiptap-button-icon" />
    ),
  };
}
