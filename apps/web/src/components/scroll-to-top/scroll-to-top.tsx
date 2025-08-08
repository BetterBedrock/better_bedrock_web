import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: ReactNode;
}

export const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return <>{children}</>;
};
