"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./collapsible.module.scss";

import clsx from "clsx";
import { ButtonType } from "@/shared/ui/button";
import { CollapsibleButton } from "./collapsible-button";
import { CollapsibleContent } from "./collapsible-content";

interface CollapsibleProp {
  headerText: string;
  contentText?: string;
  children?: ReactNode;
  width?: number | string;
  contentHeight?: number | string;
  indexTextRef?: string | number;
  floating?: boolean;
  limit?: boolean;
  className?: string;
  type?: ButtonType;
  onOpenChange?: (open: boolean) => void;
  closeTrigger?: number;
}

export const Collapsible = ({
  headerText,
  contentText = "",
  children,
  width,
  contentHeight,
  floating = false,
  indexTextRef = "",
  className,
  limit = false,
  type = "dark",
  onOpenChange,
  closeTrigger,
}: CollapsibleProp) => {
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (closeTrigger && isCollapsed) {
      setCollapsed(false);
    }
  }, [closeTrigger]);

  const handleToggle = (open: boolean) => {
    setCollapsed(open);
    onOpenChange?.(open);
  };

  return (
    <div
      className={clsx(
        styles.collapsible,
        floating && styles.floating,
        className && className,
      )}
      style={{ width: width }}
    >
      <details
        open={isCollapsed}
        className={styles.details}
        itemScope
        itemProp="mainEntity"
        itemType="https://schema.org/Question"
      >
        <CollapsibleButton
          headerText={headerText}
          isCollapsed={isCollapsed}
          setCollapsed={handleToggle}
          indexTextRef={indexTextRef}
          type={type}
        />

        <CollapsibleContent
          floating={floating}
          limit={limit}
          contentText={contentText}
          contentHeight={contentHeight}
        >
          {children}
        </CollapsibleContent>
      </details>
    </div>
  );
};
