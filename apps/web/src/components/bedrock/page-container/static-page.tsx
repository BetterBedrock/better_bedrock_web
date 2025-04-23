import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./static-page.module.css";
import { PageImageWrapper } from "./image-wrapper";

interface StaticPageProps {
  children: ReactNode,
  style?: React.CSSProperties,
  calculateMinHeight?: boolean,
  id?: string,
  className?: string,
  backgroundUrl: string
  useChildrenPadding?: boolean
  useFullHeight?: boolean
}

export const StaticPage: React.FC<StaticPageProps> = ({ children, style, calculateMinHeight = true, id, className, backgroundUrl, useChildrenPadding = true, useFullHeight = false }) => {
  const [minHeight, setMinHeight] = useState("0");
  const location = useLocation();

  const handleResize = () => {
    if (!calculateMinHeight) return;
    const navbar = document.getElementById('navbar');
    //getBoundingClientRect().height
    const navbarOffset = navbar ? navbar.offsetHeight : 0;
    const footer = document.getElementById('footer');
    const footerOffset = footer ? footer.offsetHeight : 0;
    setMinHeight(calculateMinHeight ? `calc(100vh - ${footerOffset + navbarOffset}px)` : "0");
  }

  if (calculateMinHeight) {
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [calculateMinHeight, location]);
  }

  return (
    <div className={styles.pageContainerWrapper}>
      <PageImageWrapper backgroundUrl={backgroundUrl} />
      <div
        id={id}
        style={{ minHeight: minHeight ?? "100%", ...style }}
        className={`${className ?? ""} ${styles.pageContainer}`}>
        <div
          className={styles.childrenContainer} style={{ padding: useChildrenPadding ? "4rem 0" : "", height: useFullHeight ? "100vh" : "", maxHeight: useFullHeight ? minHeight : "" }} >
          <section>
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}