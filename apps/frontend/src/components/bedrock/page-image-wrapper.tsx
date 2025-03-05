import React, { ReactNode } from "react";

interface PageImageWrapperProp {
  backgroundUrl: string;
  children: ReactNode;
  backgroundOpacity1?: number;
  backgroundOpacity2?: number;
}

export const PageImageWrapper: React.FC<PageImageWrapperProp> = ({
  backgroundUrl,
  children,
  backgroundOpacity1 = 0.35,
  backgroundOpacity2 = 0.75
}) => {
  return (
    <>
      <div style={{
        background: `linear-gradient(rgba(0, 0, 0, ${backgroundOpacity1}), rgba(0, 0, 0, ${backgroundOpacity2})) 0% 0% / cover no-repeat, url(${backgroundUrl})`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        {children}
      </div>
    </>
  )
};
