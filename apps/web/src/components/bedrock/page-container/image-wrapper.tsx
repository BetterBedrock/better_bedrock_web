import React from "react";

interface PageImageWrapperProp {
  backgroundUrl?: string;
  backgroundOpacity1?: number;
  backgroundOpacity2?: number;
  children?: React.ReactNode;
}

export const PageImageWrapper: React.FC<PageImageWrapperProp> = ({
  backgroundUrl = "",
  backgroundOpacity1 = 0.4,
  backgroundOpacity2 = 1,
  children
}) => {
  return (
    <>
      <div style={{
        background: `linear-gradient(rgba(0, 0, 0, ${backgroundOpacity1}), rgba(0, 0, 0, ${backgroundOpacity2})) 0% 0% / cover no-repeat, url(${backgroundUrl})`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        zIndex: -10,
        position: children ? undefined : "fixed", //for static and dynamic page container
        backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      }}>
      {children}
    </div >
    </>
  )
};
