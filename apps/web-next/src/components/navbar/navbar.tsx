"use client";

import { useState } from "react";
import { Label } from "../label";
import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Banner } from "@/components/banner";
import { NavbarNavItems } from "./navbar-nav-items";
import { NavbarLogo } from "./navbar-logo";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);

  const handleExpandNavbar = (value?: boolean) => {
    setExpandedNavbar((prev) => (value !== undefined ? value : !prev));
  };

  const pcLayout = (
    <div className={clsx(styles.buttonsWrapper, styles.links)}>
      <NavbarNavItems
        onNavClick={() => handleExpandNavbar(false)}
        isMobile={false}
      />
    </div>
  );

  const mobileLayout = (
    <div className={clsx(styles.buttonsWrapper, styles.expandedMenuLayout)}>
      <NavbarNavItems
        onNavClick={() => handleExpandNavbar(false)}
        isMobile={true}
      />
    </div>
  );
  return (
    <>
      {process.env.NEXT_PUBLIC_FRONTEND_URL === "dev.betterbedrock.com" && (
        <Banner
          type="info"
          message="This is a developer version of Better Bedrock Website"
        />
      )}
      <header className={styles.container}>
        <Label
          height=""
          className={clsx(
            styles.wrapper,
            expandedNavbar && styles.expandedBorder
          )}
        >
          <NavbarLogo
            expandedNavbar={expandedNavbar}
            handleExpandNavbar={handleExpandNavbar}
          />
          {pcLayout}
        </Label>
        {expandedNavbar && <div className={styles.expandedMenu}>{mobileLayout}</div>}
      </header>
    </>
  );
};
