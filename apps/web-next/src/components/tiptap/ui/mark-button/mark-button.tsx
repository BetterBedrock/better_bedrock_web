import {
  ToolbarButton,
  ToolbarButtonProps,
} from "@/components/tiptap/primitive/toolbar-button";
import { useMark, UseMarkConfig } from "@/components/tiptap/ui/mark-button";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { forwardRef, MouseEvent, useCallback } from "react";

export interface MarkButtonProps
  extends Omit<ToolbarButtonProps, "type">,
    UseMarkConfig {
  text?: string;
}

export const MarkButton = forwardRef<HTMLButtonElement, MarkButtonProps>(
  (
    {
      editor: providedEditor,
      type,
      text,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleMark, label, canToggle, isActive, Icon } = useMark(
      {
        editor,
        type,
        hideWhenUnavailable,
        onToggled,
      }
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleMark();
      },
      [handleMark, onClick]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <ToolbarButton
        type="button"
        disabled={!canToggle}
        data-active-state={isActive ? "on" : "off"}
        data-disabled={!canToggle}
        role="button"
        tabIndex={-1}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            {Icon}
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </ToolbarButton>
    );
  }
);

MarkButton.displayName = "MarkButton";
