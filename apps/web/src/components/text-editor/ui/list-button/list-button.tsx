// --- Hooks ---
import { useTiptapEditor } from "~/hooks/use-tiptap-editor";

import type { UseListConfig } from "~/components/text-editor/ui/list-button";
import { useList } from "~/components/text-editor/ui/list-button";
import { forwardRef, MouseEvent, useCallback } from "react";
import { ToolbarButton, ToolbarButtonProps } from "~/components/text-editor/primitive/toolbar-button";

export interface ListButtonProps extends Omit<ToolbarButtonProps, "type">, UseListConfig {
  text?: string;
}

export const ListButton = forwardRef<HTMLButtonElement, ListButtonProps>(
  (
    {
      editor: providedEditor,
      type,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, Icon } = useList({
      editor,
      type,
      hideWhenUnavailable,
      onToggled,
    });

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick],
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
        disabled={!canToggle}
        data-disabled={!canToggle}
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
