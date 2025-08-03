import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { ReactNode } from "react";
import clsx from "clsx";

interface CollapsibleContentProps {
  contentText: string;
  children?: ReactNode;
  floating?: boolean;
  contentHeight?: number | string;
}

export const CollapsibleContent = ({
  contentText,
  children,
  contentHeight,
  floating,
}: CollapsibleContentProps) => (
  <div
    className={clsx(styles.frame, floating && styles.floating)}
    style={{ height: contentHeight }}
  >
    <div className={styles.content}>
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
