import { ReactNode, useState } from "react";
import { styles } from ".";
import { CollapsibleButton } from "~/components/bedrock/collapsible/collapsible-button";
import { CollapsibleContent } from "~/components/bedrock/collapsible/collapsible-content";

interface CollapsibleProp {
  headerText: string;
  contentText: string;
  children?: ReactNode;
  width?: number | string;
  contentHeight?: number | string;
  indexTextRef?: string | number;
}

export const Collapsible = ({
  headerText,
  contentText,
  children,
  width,
  contentHeight,
  indexTextRef = "",
}: CollapsibleProp) => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.collapsible} style={{ width: width }}>
      {
        <CollapsibleButton
          headerText={headerText}
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
          indexTextRef={indexTextRef}
        />
      }
      {isCollapsed && (
        <CollapsibleContent contentText={contentText} contentHeight={contentHeight}>
          {children}
        </CollapsibleContent>
      )}
    </div>
  );
};
