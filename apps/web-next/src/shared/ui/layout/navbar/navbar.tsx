"use client";

import { useCallback, useState, useEffect } from "react";
import { Label } from "../../label";
import { Banner } from "@/shared/ui/banner";
import { NavbarNavItems } from "./navbar-nav-items";
import { NavbarLogo } from "./navbar-logo";
import styles from "./navbar.module.scss";
import clsx from "clsx";
import { useSettings } from "@/app/providers/settings";
import dayjs from "dayjs";
import Markdown from "react-markdown";

export const Navbar = () => {
  const { settings } = useSettings();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = useCallback((value?: boolean) => {
    setExpanded((prev) => (value !== undefined ? value : !prev));
  }, []);

  // Auto-collapse on breakpoint changes to prevent state persistence issues
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // tablet breakpoint

    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches && expanded) {
        setExpanded(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, [expanded]);

  const { banner, bannerText, bannerVariant, bannerExpirationDate } =
    settings ?? {};
  const hasBannerExpired = dayjs(bannerExpirationDate).isBefore(new Date());

  console.log({ bannerData: settings });

  return (
    <>
      {banner && !hasBannerExpired && (
        <Banner
          variant={bannerVariant ?? "info"}
          message={
            banner ? (
              <Markdown>{bannerText}</Markdown>
            ) : (
              "This is a developer version of Better Bedrock Website"
            )
          }
        />
      )}

      <header className={styles.container}>
        <Label
          height="100%"
          className={clsx(styles.wrapper, expanded && styles.expandedBorder)}
        >
          <NavbarLogo
            expandedNavbar={expanded}
            handleExpandNavbar={handleExpand}
          />

          <div className={styles.buttonsWrapper}>
            <NavbarNavItems
              onNavClick={() => setExpanded(false)}
              isMobile={false}
            />
          </div>
        </Label>

        {expanded && (
          <div className={styles.expandedMenu}>
            <div
              className={clsx(styles.buttonsWrapper, styles.expandedMenuLayout)}
            >
              <NavbarNavItems onNavClick={() => setExpanded(false)} isMobile />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
