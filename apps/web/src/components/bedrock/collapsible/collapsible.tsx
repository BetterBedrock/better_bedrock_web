import { ReactNode, useState } from "react";
import { styles } from ".";
import { CollapsibleButton } from "~/components/bedrock/collapsible/collapsible-button";
import { CollapsibleContent } from "~/components/bedrock/collapsible/collapsible-content";
import clsx from "clsx";
import { ButtonType } from "~/components/bedrock/button";

interface CollapsibleProp {
  headerText: string;
  contentText: string;
  children?: ReactNode;
  width?: number | string;
  contentHeight?: number | string;
  indexTextRef?: string | number;
  floating?: boolean;
  limit?: boolean;
  className?: string;
  type?: ButtonType;
}

export const Collapsible = ({
  headerText,
  contentText,
  children,
  width,
  contentHeight,
  floating = false,
  indexTextRef = "",
  className,
  limit = false,
  type = "dark",
}: CollapsibleProp) => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div
      className={clsx(styles.collapsible, floating && styles.floating, className && className)}
      style={{ width: width }}
    >
      <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
        <CollapsibleButton
          headerText={headerText}
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
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
