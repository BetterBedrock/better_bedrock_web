import { Separator } from "~/components/tiptap-ui-primitive/separator";
import { useMenuNavigation } from "~/hooks/use-menu-navigation";
import { useComposedRef } from "~/hooks/use-composed-ref";
import clsx from "clsx";
import { styles } from ".";
import { useState, useCallback, useEffect, forwardRef, useRef } from "react";
import { CardDivider } from "~/components/bedrock/card";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

interface ToolbarProps extends BaseProps {
  variant?: "floating" | "fixed";
}

const useToolbarNavigation = (toolbarRef: React.RefObject<HTMLDivElement | null>) => {
  const [items, setItems] = useState<HTMLElement[]>([]);

  const collectItems = useCallback(() => {
    if (!toolbarRef.current) return [];
    return Array.from(
      toolbarRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])',
      ),
    );
  }, [toolbarRef]);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const updateItems = () => setItems(collectItems());

    updateItems();
    const observer = new MutationObserver(updateItems);
    observer.observe(toolbar, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [collectItems, toolbarRef]);

  const { selectedIndex } = useMenuNavigation<HTMLElement>({
    containerRef: toolbarRef,
    items,
    orientation: "horizontal",
    onSelect: (el) => el.click(),
    autoSelectFirstItem: false,
  });

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target)) target.setAttribute("data-focus-visible", "true");
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target)) target.removeAttribute("data-focus-visible");
    };

    toolbar.addEventListener("focus", handleFocus, true);
    toolbar.addEventListener("blur", handleBlur, true);

    return () => {
      toolbar.removeEventListener("focus", handleFocus, true);
      toolbar.removeEventListener("blur", handleBlur, true);
    };
  }, [toolbarRef]);

  useEffect(() => {
    if (selectedIndex !== undefined && items[selectedIndex]) {
      items[selectedIndex].focus();
    }
  }, [selectedIndex, items]);
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, className, variant = "fixed", ...props }, ref) => {
    const toolbarRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRef(toolbarRef, ref);
    useToolbarNavigation(toolbarRef);

    return (
      <>
        <div
          ref={composedRef}
          role="toolbar"
          aria-label="toolbar"
          data-variant={variant}
          className={clsx(styles.card, className)}
          {...props}
        >
          {children}
        </div>
        <CardDivider />
      </>
    );
  },
);
Toolbar.displayName = "Toolbar";

export const ToolbarGroup = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} role="group" className={clsx(styles.group, className)} {...props}>
      {children}
    </div>
  ),
);
ToolbarGroup.displayName = "ToolbarGroup";

export const ToolbarSeparator = forwardRef<HTMLDivElement, BaseProps>(({ ...props }, ref) => (
  <Separator ref={ref} orientation="vertical" decorative {...props} />
));
ToolbarSeparator.displayName = "ToolbarSeparator";
