"use client";

import { useCallback, useState } from "react";
import { Label } from "../../label";
import { Banner } from "@/shared/ui/banner";
import { NavbarNavItems } from "./navbar-nav-items";
import { NavbarLogo } from "./navbar-logo";
import styles from "./navbar.module.scss";
import clsx from "clsx";

const IS_DEV = process.env.NEXT_PUBLIC_FRONTEND_URL === "dev.betterbedrock.com";

export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = useCallback((value?: boolean) => {
    setExpanded((prev) => (value !== undefined ? value : !prev));
  }, []);

  const closeNavbar = useCallback(() => handleExpand(false), [handleExpand]);

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
          height=""
          className={clsx(styles.wrapper, expanded && styles.expandedBorder)}
        >
          <NavbarLogo expandedNavbar={expanded} handleExpandNavbar={handleExpand} />

          <div className={clsx(styles.buttonsWrapper, styles.links)}>
            <NavbarNavItems onNavClick={closeNavbar} isMobile={false} />
          </div>
        </Label>

        {expanded && (
          <div className={styles.expandedMenu}>
            <div className={clsx(styles.buttonsWrapper, styles.expandedMenuLayout)}>
              <NavbarNavItems onNavClick={closeNavbar} isMobile />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
