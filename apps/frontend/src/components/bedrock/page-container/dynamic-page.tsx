import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface DynamicPageProps {
  children: ReactNode,
  style?: React.CSSProperties,
  id?: string,
  className?: string,
  backgroundUrl: string
  useChildrenPadding?: boolean
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ children, style, id, className, backgroundUrl, useChildrenPadding = true }) => {
  const [navBarValue, setNavBarValue] = useState("0");
  const location = useLocation();

  const handleResize = () => {
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar ? navbar.offsetHeight : 0;
    setNavBarValue(`calc(100vh - ${navbarOffset}px)`);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  return (
    <div style={{ height: navBarValue, scrollSnapType: "y mandatory", overflowY: "scroll", scrollBehavior: "smooth" }}>
      {children}
    </div>
  )
}