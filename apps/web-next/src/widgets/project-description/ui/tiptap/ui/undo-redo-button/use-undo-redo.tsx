"use client";

import { type Editor } from "@tiptap/react";

import UndoIcon from "@/public/ui/tiptap-icons/1.png";
import RedoIcon from "@/public/ui/tiptap-icons/2.png";
import { useState, useEffect, useCallback } from "react";
import { TiptapIcon } from "@/widgets/project-description/ui/tiptap/tiptap-icon";
import { isNodeTypeSelected } from "@/lib/tiptap-utils";
import { useTiptapEditor } from "@/widgets/project-description/model/use-tiptap-editor";

export type UndoRedoAction = "undo" | "redo";

export interface UseUndoRedoConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * The history action to perform (undo or redo).
   */
  action: UndoRedoAction;
  /**
   * Whether the button should hide when action is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called after a successful action execution.
   */
  onExecuted?: () => void;
}

export const historyActionLabels: Record<UndoRedoAction, string> = {
  undo: "Undo",
  redo: "Redo",
};

export const historyIcons = {
  undo: <TiptapIcon icon={UndoIcon.src} className="tiptap-button-icon" />,
  redo: <TiptapIcon icon={RedoIcon.src} className="tiptap-button-icon" />,
};

/**
 * Checks if a history action can be executed
 */
export function canExecuteUndoRedoAction(
  editor: Editor | null,
  action: UndoRedoAction,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (isNodeTypeSelected(editor, ["image"])) return false;

  return action === "undo" ? editor.can().undo() : editor.can().redo();
}

/**
 * Executes a history action on the editor
 */
export function executeUndoRedoAction(
  editor: Editor | null,
  action: UndoRedoAction,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canExecuteUndoRedoAction(editor, action)) return false;

  const chain = editor.chain().focus();
  return action === "undo" ? chain.undo().run() : chain.redo().run();
}

/**
 * Determines if the history button should be shown
 */
export function shouldShowButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
  action: UndoRedoAction;
}): boolean {
  const { editor, hideWhenUnavailable, action } = props;

  if (!editor || !editor.isEditable) return false;

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canExecuteUndoRedoAction(editor, action);
  }

  return true;
}

export function useUndoRedo(config: UseUndoRedoConfig) {
  const {
    editor: providedEditor,
    action,
    hideWhenUnavailable = false,
    onExecuted,
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canExecute = canExecuteUndoRedoAction(editor, action);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable, action }));
    };

    handleUpdate();

    editor.on("transaction", handleUpdate);

    return () => {
      editor.off("transaction", handleUpdate);
    };
  }, [editor, hideWhenUnavailable, action]);

  const handleAction = useCallback(() => {
    if (!editor) return false;

    const success = executeUndoRedoAction(editor, action);
    if (success) {
      onExecuted?.();
    }
    return success;
  }, [editor, action, onExecuted]);

  return {
    isVisible,
    handleAction,
    canExecute,
    label: historyActionLabels[action],
    Icon: historyIcons[action],
  };
}
