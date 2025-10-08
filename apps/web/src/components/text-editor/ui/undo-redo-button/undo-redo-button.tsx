// --- Hooks ---
import { useTiptapEditor } from "~/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type {
  UseUndoRedoConfig,
} from "~/components/text-editor/ui/undo-redo-button"
import {
  useUndoRedo,
} from "~/components/text-editor/ui/undo-redo-button"

import { forwardRef, useCallback } from "react"
import { ToolbarButton, ToolbarButtonProps } from "~/components/text-editor/primitive/toolbar-button"

export interface UndoRedoButtonProps
  extends Omit<ToolbarButtonProps, "type">,
    UseUndoRedoConfig {

  text?: string
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
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleAction, label, canExecute, Icon } =
      useUndoRedo({
        editor,
        action,
        hideWhenUnavailable,
        onExecuted,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleAction()
      },
      [handleAction, onClick]
    )

    if (!isVisible) {
      return null
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
    )
  }
)