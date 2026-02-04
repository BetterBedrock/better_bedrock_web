import { ReactNode } from "react";
import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./collapsible.module.scss";

interface CollapsibleContentProps {
  contentText: string;
  children?: ReactNode;
  floating?: boolean;
  limit?: boolean;
  contentHeight?: number | string;
}

export const CollapsibleContent = ({
  contentText,
  children,
  contentHeight,
  floating,
  limit,
}: CollapsibleContentProps) => (
  <div
    className={clsx(
      styles.frame,
      floating && styles.floating,
      limit && styles.limit,
    )}
    style={{ height: contentHeight }}
  >
    <div className={styles.content}>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      />
      <BedrockText
        type="p"
        text={contentText}
        textAlign="left"
        extraClassName={styles.contentText}
      />
      {children}
    </div>
  </div>
);
