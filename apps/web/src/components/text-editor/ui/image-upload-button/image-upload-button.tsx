import { useTiptapEditor } from "~/hooks/use-tiptap-editor";

// --- Tiptap UI ---
import type { UseImageUploadConfig } from "~/components/text-editor/ui/image-upload-button";
import { useImageUpload } from "~/components/text-editor/ui/image-upload-button";

import { forwardRef, useCallback } from "react";
import {
  ToolbarButton,
  ToolbarButtonProps,
} from "~/components/text-editor/primitive/toolbar-button";

export interface ImageUploadButtonProps
  extends Omit<ToolbarButtonProps, "type">,
    UseImageUploadConfig {
}

export const ImageUploadButton = forwardRef<HTMLButtonElement, ImageUploadButtonProps>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onInserted,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canInsert, handleImage, label, isActive, Icon } = useImageUpload({
      editor,
      hideWhenUnavailable,
      onInserted,
    });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleImage();
      },
      [handleImage, onClick],
    );

    if (!isVisible) {
      return null;
    }

    return (
      <ToolbarButton
        type="button"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? Icon}
      </ToolbarButton>
    );
  },
);
