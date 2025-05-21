import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { ReactNode } from "react";

interface CollapsibleContentProps {
  contentText: string;
  children?: ReactNode;
  contentHeight?: number | string;
}

export const CollapsibleContent = ({
  contentText,
  children,
  contentHeight,
}: CollapsibleContentProps) => (
  <div className={styles.frame} style={{ height: contentHeight }}>
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
