"use client";

import type { Editor } from "@tiptap/react";

// --- Icons ---
import BoldIcon from "@/public/ui/tiptap-icons/4.png";
import ItalicIcon from "@/public/ui/tiptap-icons/5.png";
import StrikeIcon from "@/public/ui/tiptap-icons/6.png";
import UnderlineIcon from "@/public/ui/tiptap-icons/7.png";
import HighlighterIcon from "@/public/ui/tiptap-icons/8.png";
import { useState, useEffect, useCallback } from "react";
import { TiptapIcon } from "@/_components/tiptap/tiptap-icon";
import { isMarkInSchema, isNodeTypeSelected } from "@/_lib/tiptap-utils";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export type Mark = "bold" | "italic" | "strike" | "underline" | "highlight";

/**
 * Configuration for the mark functionality
 */
export interface UseMarkConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * The type of mark to toggle
   */
  type: Mark;
  /**
   * Whether the button should hide when mark is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called after a successful mark toggle.
   */
  onToggled?: () => void;
}

export const markIcons = {
  bold: <TiptapIcon icon={BoldIcon.src} className="tiptap-button-icon" />,
  italic: <TiptapIcon icon={ItalicIcon.src} className="tiptap-button-icon" />,
  underline: <TiptapIcon icon={UnderlineIcon.src} className="tiptap-button-icon" />,
  strike: <TiptapIcon icon={StrikeIcon.src} className="tiptap-button-icon" />,
  highlight: (
    <TiptapIcon icon={HighlighterIcon.src} className="tiptap-button-icon" />
  ),
};

/**
 * Checks if a mark can be toggled in the current editor state
 */
export function canToggleMark(editor: Editor | null, type: Mark): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isMarkInSchema(type, editor) || isNodeTypeSelected(editor, ["image"]))
    return false;

  return editor.can().toggleMark(type);
}

/**
 * Checks if a mark is currently active
 */
export function isMarkActive(editor: Editor | null, type: Mark): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive(type);
}

/**
 * Toggles a mark in the editor
 */
export function toggleMark(editor: Editor | null, type: Mark): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleMark(editor, type)) return false;

  return editor.chain().focus().toggleMark(type).run();
}

/**
 * Determines if the mark button should be shown
 */
export function shouldShowButton(props: {
  editor: Editor | null;
  type: Mark;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, type, hideWhenUnavailable } = props;

  if (!editor || !editor.isEditable) return false;
  if (!isMarkInSchema(type, editor)) return false;

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleMark(editor, type);
  }

  return true;
}

/**
 * Gets the formatted mark name
 */
export function getFormattedMarkName(type: Mark): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function useMark(config: UseMarkConfig) {
  const {
    editor: providedEditor,
    type,
    hideWhenUnavailable = false,
    onToggled,
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canToggle = canToggleMark(editor, type);
  const isActive = isMarkActive(editor, type);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, type, hideWhenUnavailable }));
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, type, hideWhenUnavailable]);

  const handleMark = useCallback(() => {
    if (!editor) return false;

    const success = toggleMark(editor, type);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, type, onToggled]);

  return {
    isVisible,
    isActive,
    handleMark,
    canToggle,
    label: getFormattedMarkName(type),
    Icon: markIcons[type],
  };
}
