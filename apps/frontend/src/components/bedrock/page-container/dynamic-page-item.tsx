import React, { ReactNode } from "react";
import { PageImageWrapper } from "./image-wrapper";

interface DynamicPageItemProps {
  children?: ReactNode,
  backgroundUrl: string
}

export const DynamicPageItem: React.FC<DynamicPageItemProps> = ({ children, backgroundUrl }) => {
  return (
    <div style={{ height: "100%", scrollSnapAlign: "center" }}>
      <PageImageWrapper backgroundUrl={backgroundUrl}>
        {children}
      </PageImageWrapper>
    </div>
  )
}