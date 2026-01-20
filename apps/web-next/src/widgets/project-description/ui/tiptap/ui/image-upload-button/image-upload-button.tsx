import {
  ToolbarButtonProps,
  ToolbarButton,
} from "@/widgets/project-description/ui/tiptap/primitive/toolbar-button";
import {
  UseImageUploadConfig,
  useImageUpload,
} from "@/widgets/project-description/ui/tiptap/ui/image-upload-button/use-image-upload";
import { useTiptapEditor } from "@/widgets/project-description/model/use-tiptap-editor";
import { forwardRef, MouseEvent, useCallback } from "react";

export interface ImageUploadButtonProps
  extends Omit<ToolbarButtonProps, "type">, UseImageUploadConfig {}

export const ImageUploadButton = forwardRef<
  HTMLButtonElement,
  ImageUploadButtonProps
>(
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
    const { isVisible, canInsert, handleImage, label, isActive, Icon } =
      useImageUpload({
        editor,
        hideWhenUnavailable,
        onInserted,
      });

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
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

ImageUploadButton.displayName = "ImageUploadButton";
