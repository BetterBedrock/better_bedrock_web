"use client";

import { type Editor } from "@tiptap/react";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";

// --- Icons ---
import ListIcon from "@/public/ui/tiptap-icons/3.png";
import { useCallback, useEffect, useState } from "react";
import { TiptapIcon } from "@/components/tiptap/tiptap-icon";
import {
  isNodeInSchema,
  isNodeTypeSelected,
  findNodePosition,
  isValidPosition,
} from "@/lib/tiptap-utils";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

export type ListType = "bulletList";

/**
 * Configuration for the list functionality
 */
export interface UseListConfig {
  editor?: Editor | null;
  type: ListType;
  hideWhenUnavailable?: boolean;
  onToggled?: () => void;
}

export const listIcons = {
  bulletList: <TiptapIcon icon={ListIcon.src} className="tiptap-button-icon" />,
};

export const listLabels: Record<ListType, string> = {
  bulletList: "Bullet List",
};

/**
 * Checks if a list can be toggled in the current editor state
 */
export function canToggleList(
  editor: Editor | null,
  type: ListType,
  turnInto: boolean = true
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema(type, editor) || isNodeTypeSelected(editor, ["image"]))
    return false;

  if (!turnInto) {
    switch (type) {
      case "bulletList":
        return editor.can().toggleBulletList();
      default:
        return false;
    }
  }

  try {
    const view = editor.view;
    const state = view.state;
    const selection = state.selection;

    if (selection.empty || selection instanceof TextSelection) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1),
      })?.pos;
      if (!isValidPosition(pos)) return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if list is currently active
 */
export function isListActive(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;

  switch (type) {
    case "bulletList":
      return editor.isActive("bulletList");
    default:
      return false;
  }
}

/**
 * Toggles list in the editor
 */
export function toggleList(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleList(editor, type)) return false;

  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;

    // No selection, find the the cursor position
    if (state.selection.empty || state.selection instanceof TextSelection) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1),
      })?.pos;
      if (!isValidPosition(pos)) return false;

      tr = tr.setSelection(NodeSelection.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }

    const selection = state.selection;

    let chain = editor.chain().focus();

    // Handle NodeSelection
    if (selection instanceof NodeSelection) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;

      const from = firstChild
        ? selection.from + firstChild.nodeSize
        : selection.from + 1;

      const to = lastChild
        ? selection.to - lastChild.nodeSize
        : selection.to - 1;

      chain = chain.setTextSelection({ from, to }).clearNodes();
    }

    if (editor.isActive(type)) {
      // Unwrap list
      chain
        .liftListItem("listItem")
        .lift("bulletList")
        .lift("orderedList")
        .lift("taskList")
        .run();
    } else {
      // Wrap in specific list type
      const toggleMap: Record<ListType, () => typeof chain> = {
        bulletList: () => chain.toggleBulletList(),
      };

      const toggle = toggleMap[type];
      if (!toggle) return false;

      toggle().run();
    }

    editor.chain().focus().selectTextblockEnd().run();

    return true;
  } catch {
    return false;
  }
}

/**
 * Determines if the list button should be shown
 */
export function shouldShowButton(props: {
  editor: Editor | null;
  type: ListType;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, type, hideWhenUnavailable } = props;

  if (!editor || !editor.isEditable) return false;
  if (!isNodeInSchema(type, editor)) return false;

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canToggleList(editor, type);
  }

  return true;
}

export function useList(config: UseListConfig) {
  const {
    editor: providedEditor,
    type,
    hideWhenUnavailable = false,
    onToggled,
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canToggle = canToggleList(editor, type);
  const isActive = isListActive(editor, type);

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

  const handleToggle = useCallback(() => {
    if (!editor) return false;

    const success = toggleList(editor, type);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, type, onToggled]);

  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle,
    label: listLabels[type],
    Icon: listIcons[type],
  };
}
