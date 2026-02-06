"use client";

import { useCallback, useState, useEffect } from "react";
import { Label } from "../../label";
import { Banner } from "@/shared/ui/banner";
import { NavbarNavItems } from "./navbar-nav-items";
import { NavbarLogo } from "./navbar-logo";
import styles from "./navbar.module.scss";
import clsx from "clsx";

const IS_DEV = process.env.NEXT_PUBLIC_FRONTEND_URL?.includes("dev.betterbedrock.com") ?? false;

export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = useCallback((value?: boolean) => {
    setExpanded((prev) => (value !== undefined ? value : !prev));
  }, []);

  // Auto-collapse on breakpoint changes to prevent state persistence issues
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)'); // tablet breakpoint
    
    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches && expanded) {
        setExpanded(false);
      }
    };

    mediaQuery.addEventListener('change', handleBreakpointChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, [expanded]);

  return (
    <>
      {IS_DEV && (
        <Banner
          type="info"
          message="This is a developer version of Better Bedrock Website"
        />
      )}

      <header className={styles.container}>
        <Label
          height="100%"
          className={clsx(styles.wrapper, expanded && styles.expandedBorder)}
        >
          <NavbarLogo expandedNavbar={expanded} handleExpandNavbar={handleExpand} />

          <div className={styles.buttonsWrapper}>
            <NavbarNavItems onNavClick={() => setExpanded(false)} isMobile={false} />
          </div>
        </Label>

        {expanded && (
          <div className={styles.expandedMenu}>
            <div className={clsx(styles.buttonsWrapper, styles.expandedMenuLayout)}>
              <NavbarNavItems onNavClick={() => setExpanded(false)} isMobile />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
