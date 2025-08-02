import { ReactNode, useState } from "react";
import { styles } from ".";
import { CollapsibleButton } from "~/components/bedrock/collapsible/collapsible-button";
import { CollapsibleContent } from "~/components/bedrock/collapsible/collapsible-content";
import clsx from "clsx";

interface CollapsibleProp {
  headerText: string;
  contentText: string;
  children?: ReactNode;
  width?: number | string;
  contentHeight?: number | string;
  indexTextRef?: string | number;
  floating?: boolean;
}

export const Collapsible = ({
  headerText,
  contentText,
  children,
  width,
  contentHeight,
  floating = false,
  indexTextRef = "",
}: CollapsibleProp) => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className={clsx(styles.collapsible, floating && styles.floating)} style={{ width: width }}>
      {
        <CollapsibleButton
          headerText={headerText}
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
          indexTextRef={indexTextRef}
        />
      }
      {isCollapsed && (
        <CollapsibleContent
          floating={floating}
          contentText={contentText}
          contentHeight={contentHeight}
        >
          {children}
        </CollapsibleContent>
      )}
    </div>
  );
};
