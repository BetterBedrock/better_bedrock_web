"use client";

import type { Editor } from "@tiptap/react";

// --- Icons ---
import LinkIcon from "@/public/ui/tiptap-icons/9.png";
import { useState, useEffect, useCallback } from "react";
import { TiptapIcon } from "@/pages/project/ui/project-description/tiptap/tiptap-icon";
import {
  isMarkInSchema,
  sanitizeUrl,
} from "@/pages/project/ui/project-description/tiptap/tiptap-utils";
import { useTiptapEditor } from "@/pages/project/model/use-tiptap-editor";

/**
 * Configuration for the link popover functionality
 */
export interface UseLinkPopoverConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Whether to hide the link popover when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called when the link is set.
   */
  onSetLink?: () => void;
}

/**
 * Configuration for the link handler functionality
 */
export interface LinkHandlerProps {
  /**
   * The Tiptap editor instance.
   */
  editor: Editor | null;
  /**
   * Callback function called when the link is set.
   */
  onSetLink?: () => void;
}

/**
 * Checks if a link can be set in the current editor state
 */
export function canSetLink(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.can().setMark("link");
}

/**
 * Checks if a link is currently active in the editor
 */
export function isLinkActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("link");
}

/**
 * Determines if the link button should be shown
 */
export function shouldShowLinkButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, hideWhenUnavailable } = props;

  const linkInSchema = isMarkInSchema("link", editor);

  if (!linkInSchema || !editor) {
    return false;
  }

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canSetLink(editor);
  }

  return true;
}

/**
 * Custom hook for handling link operations in a Tiptap editor
 */
export function useLinkHandler(props: LinkHandlerProps) {
  const { editor, onSetLink } = props;
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) return;

    // Get URL immediately on mount
    const { href } = editor.getAttributes("link");

    if (isLinkActive(editor) && url === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(href || "");
    }
  }, [editor, url]);

  useEffect(() => {
    if (!editor) return;

    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");
    };

    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor]);

  const setLink = useCallback(() => {
    if (!url || !editor) return;

    const { selection } = editor.state;
    const isEmpty = selection.empty;

    let chain = editor.chain().focus();

    chain = chain.extendMarkRange("link").setLink({ href: url });

    if (isEmpty) {
      chain = chain.insertContent({ type: "text", text: url });
    }

    chain.run();

    setUrl(null);

    onSetLink?.();
  }, [editor, onSetLink, url]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .unsetLink()
      .setMeta("preventAutolink", true)
      .run();
    setUrl("");
  }, [editor]);

  const openLink = useCallback(
    (target: string = "_blank", features: string = "noopener,noreferrer") => {
      if (!url) return;

      const safeUrl = sanitizeUrl(url, window.location.href);
      if (safeUrl !== "#") {
        window.open(safeUrl, target, features);
      }
    },
    [url],
  );

  return {
    url: url || "",
    setUrl,
    setLink,
    removeLink,
    openLink,
  };
}

/**
 * Custom hook for link popover state management
 */
export function useLinkState(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}) {
  const { editor, hideWhenUnavailable = false } = props;

  const canSet = canSetLink(editor);
  const isActive = isLinkActive(editor);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowLinkButton({
          editor,
          hideWhenUnavailable,
        }),
      );
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);

  return {
    isVisible,
    canSet,
    isActive,
  };
}

export function useLinkPopover(config?: UseLinkPopoverConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onSetLink,
  } = config || {};

  const { editor } = useTiptapEditor(providedEditor);

  const { isVisible, canSet, isActive } = useLinkState({
    editor,
    hideWhenUnavailable,
  });

  const linkHandler = useLinkHandler({
    editor,
    onSetLink,
  });

  return {
    isVisible,
    canSet,
    isActive,
    label: "Link",
    Icon: <TiptapIcon icon={LinkIcon.src} className="tiptap-button-icon" />,
    ...linkHandler,
  };
}
