"use client";

import type { Editor } from "@tiptap/react";

import LinkIcon from "@/public/ui/tiptap-icons/9.png";
import TrashIcon from "@/public/ui/tiptap-icons/15.png";
import CornerDownLeftIcon from "@/public/ui/tiptap-icons/16.png";
import ExternalLinkIcon from "@/public/ui/tiptap-icons/17.png";
import { styles, useLinkPopover, UseLinkPopoverConfig } from ".";
import {
  Dispatch,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "@/shared/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/widgets/project-description/ui/tiptap/primitive/popover";
import {
  ToolbarButtonProps,
  ToolbarButton,
} from "@/widgets/project-description/ui/tiptap/primitive/toolbar-button";
import { TiptapIcon } from "@/widgets/project-description/ui/tiptap/tiptap-icon";
import { TooltipBackground } from "@/shared/ui/tooltip/tooltip-background";
import { useTiptapEditor } from "@/widgets/project-description/model/use-tiptap-editor";

export interface LinkMainProps {
  /**
   * The URL to set for the link.
   */
  url: string;
  /**
   * Function to update the URL state.
   */
  setUrl: Dispatch<SetStateAction<string | null>>;
  /**
   * Function to set the link in the editor.
   */
  setLink: () => void;
  /**
   * Function to remove the link from the editor.
   */
  removeLink: () => void;
  /**
   * Function to open the link.
   */
  openLink: () => void;
  /**
   * Whether the link is currently active in the editor.
   */
  isActive: boolean;
}

export interface LinkPopoverProps
  extends Omit<ToolbarButtonProps, "type">, UseLinkPopoverConfig {
  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether to automatically open the popover when a link is active.
   * @default true
   */
  autoOpenOnLinkActive?: boolean;
}

/**
 * Link button component for triggering the link popover
 */
export const LinkButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ToolbarButton
        type="button"
        className={className}
        role="button"
        tabIndex={-1}
        aria-label="Link"
        tooltip="Link"
        ref={ref}
        {...props}
      >
        {children || (
          <TiptapIcon icon={LinkIcon.src} className="tiptap-button-icon" />
        )}
      </ToolbarButton>
    );
  },
);

LinkButton.displayName = "LinkButton";

/**
 * Main content component for the link popover
 */
const LinkMain = ({
  url,
  setUrl,
  setLink,
  removeLink,
  openLink,
  isActive,
}: LinkMainProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLink();
    }
  };

  return (
    <div>
      <Input
        type="url"
        placeholder="Paste a link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      <div className={styles.actions}>
        <ToolbarButton
          type="button"
          onClick={setLink}
          title="Apply link"
          disabled={!url && !isActive}
        >
          <TiptapIcon
            icon={CornerDownLeftIcon.src}
            className="tiptap-button-icon"
          />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={openLink}
          title="Open in new window"
          disabled={!url && !isActive}
        >
          <TiptapIcon
            icon={ExternalLinkIcon.src}
            className="tiptap-button-icon"
          />
        </ToolbarButton>

        <ToolbarButton
          type="button"
          onClick={removeLink}
          title="Remove link"
          disabled={!url && !isActive}
        >
          <TiptapIcon icon={TrashIcon.src} className="tiptap-button-icon" />
        </ToolbarButton>
      </div>
    </div>
  );
};

/**
 * Link content component for standalone use
 */
export const LinkContent = ({ editor }: { editor?: Editor | null }) => {
  const linkPopover = useLinkPopover({
    editor,
  });

  return <LinkMain {...linkPopover} />;
};

/**
 * Link popover component for Tiptap editors.
 *
 * For custom popover implementations, use the `useLinkPopover` hook instead.
 */
export const LinkPopover = forwardRef<HTMLButtonElement, LinkPopoverProps>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onSetLink,
      onOpenChange,
      autoOpenOnLinkActive = true,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [isOpen, setIsOpen] = useState(false);

    const {
      isVisible,
      canSet,
      isActive,
      url,
      setUrl,
      setLink,
      removeLink,
      openLink,
      label,
      Icon,
    } = useLinkPopover({
      editor,
      hideWhenUnavailable,
      onSetLink,
    });

    const handleOnOpenChange = useCallback(
      (nextIsOpen: boolean) => {
        setIsOpen(nextIsOpen);
        onOpenChange?.(nextIsOpen);
      },
      [onOpenChange],
    );

    const handleSetLink = useCallback(() => {
      setLink();
      setIsOpen(false);
    }, [setLink]);

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setIsOpen(!isOpen);
      },
      [onClick, isOpen],
    );

    useEffect(() => {
      if (autoOpenOnLinkActive && isActive) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(true);
      }
    }, [autoOpenOnLinkActive, isActive]);

    if (!isVisible) {
      return null;
    }

    return (
      <Popover
        key={String(isOpen)}
        open={isOpen}
        onOpenChange={handleOnOpenChange}
      >
        <PopoverTrigger asChild>
          <LinkButton
            disabled={!canSet}
            data-active-state={isActive ? "on" : "off"}
            data-disabled={!canSet}
            aria-label={label}
            aria-pressed={isActive}
            onClick={handleClick}
            {...buttonProps}
            ref={ref}
          >
            {children ?? Icon}
          </LinkButton>
        </PopoverTrigger>

        <PopoverContent>
          <TooltipBackground>
            <LinkMain
              url={url}
              setUrl={setUrl}
              setLink={handleSetLink}
              removeLink={removeLink}
              openLink={openLink}
              isActive={isActive}
            />
          </TooltipBackground>
        </PopoverContent>
      </Popover>
    );
  },
);

LinkPopover.displayName = "LinkPopover";

export default LinkPopover;
