import {
  ToolbarButtonProps,
  ToolbarButton,
} from "@/pages/project/ui/project-description/tiptap/primitive/toolbar-button";
import {
  UseUndoRedoConfig,
  useUndoRedo,
} from "@/pages/project/ui/project-description/tiptap/components/undo-redo-button/use-undo-redo";
import { useTiptapEditor } from "@/pages/project/model/use-tiptap-editor";
import { forwardRef, MouseEvent, useCallback } from "react";

export interface UndoRedoButtonProps
  extends Omit<ToolbarButtonProps, "type">, UseUndoRedoConfig {
  text?: string;
}

export const UndoRedoButton = forwardRef<
  HTMLButtonElement,
  UndoRedoButtonProps
>(
  (
    {
      editor: providedEditor,
      action,
      text,
      hideWhenUnavailable = false,
      onExecuted,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleAction, label, canExecute, Icon } = useUndoRedo({
      editor,
      action,
      hideWhenUnavailable,
      onExecuted,
    });

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleAction();
      },
      [handleAction, onClick],
    );

    if (!isVisible) {
      return null;
    }

    return (
      <ToolbarButton
        type="button"
        disabled={!canExecute}
        data-disabled={!canExecute}
        role="button"
        tabIndex={-1}
        aria-label={label}
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
  },
);

UndoRedoButton.displayName = "UndoRedoButton";
