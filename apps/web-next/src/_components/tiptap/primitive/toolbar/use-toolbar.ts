"use client";

import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useState, useCallback, useEffect, RefObject } from "react";

export const useToolbar = (toolbarRef: RefObject<HTMLDivElement | null>) => {
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