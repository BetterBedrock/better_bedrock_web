import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { ReactNode } from "react";
import clsx from "clsx";
import { ButtonType } from "~/components/bedrock/button";

interface CollapsibleContentProps {
  contentText: string;
  children?: ReactNode;
  floating?: boolean;
  limit?: boolean;
  type: ButtonType;
  contentHeight?: number | string;
}

export const CollapsibleContent = ({
  contentText,
  children,
  contentHeight,
  floating,
  limit,
  type
}: CollapsibleContentProps) => (
  <div
    className={clsx(styles.frame, floating && styles.floating, limit && styles.limit, styles[type])}
    style={{ height: contentHeight }}
  >
    <div className={styles.content}>
      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" />
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
