"use client";

import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "~/hooks/use-tiptap-editor";
import { useIsMobile } from "~/hooks/use-mobile";

// --- Lib ---
import { isNodeTypeSelected } from "~/lib/tiptap-utils";

import UndoIcon from "~/assets/ui/tiptap-icons/1.png";
import RedoIcon from "~/assets/ui/tiptap-icons/2.png";
import { TiptapIcon } from "~/components/tiptap-icons";

export type UndoRedoAction = "undo" | "redo";

/**
 * Configuration for the history functionality
 */
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

export const UNDO_REDO_SHORTCUT_KEYS: Record<UndoRedoAction, string> = {
  undo: "mod+z",
  redo: "mod+shift+z",
};

export const historyActionLabels: Record<UndoRedoAction, string> = {
  undo: "Undo",
  redo: "Redo",
};

export const historyIcons = {
  undo: <TiptapIcon icon={UndoIcon} className="tiptap-button-icon" />,
  redo: <TiptapIcon icon={RedoIcon} className="tiptap-button-icon" />,
};

/**
 * Checks if a history action can be executed
 */
export function canExecuteUndoRedoAction(editor: Editor | null, action: UndoRedoAction): boolean {
  if (!editor || !editor.isEditable) return false;
  if (isNodeTypeSelected(editor, ["image"])) return false;

  return action === "undo" ? editor.can().undo() : editor.can().redo();
}

/**
 * Executes a history action on the editor
 */
export function executeUndoRedoAction(editor: Editor | null, action: UndoRedoAction): boolean {
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
  const { editor: providedEditor, action, hideWhenUnavailable = false, onExecuted } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const canExecute = canExecuteUndoRedoAction(editor, action);

  React.useEffect(() => {
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

  const handleAction = React.useCallback(() => {
    if (!editor) return false;

    const success = executeUndoRedoAction(editor, action);
    if (success) {
      onExecuted?.();
    }
    return success;
  }, [editor, action, onExecuted]);

  useHotkeys(
    UNDO_REDO_SHORTCUT_KEYS[action],
    (event) => {
      event.preventDefault();
      handleAction();
    },
    {
      enabled: isVisible && canExecute,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    },
  );

  return {
    isVisible,
    handleAction,
    canExecute,
    label: historyActionLabels[action],
    shortcutKeys: UNDO_REDO_SHORTCUT_KEYS[action],
    Icon: historyIcons[action],
  };
}
