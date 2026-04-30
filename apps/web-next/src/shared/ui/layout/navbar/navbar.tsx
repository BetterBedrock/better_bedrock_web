"use client";

import { useCallback, useState } from "react";
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

  const { banner, bannerText, bannerVariant, bannerExpirationDate } =
    settings ?? {};
  const hasBannerExpired = dayjs(bannerExpirationDate).isBefore(new Date());

  return (
    <>
      {banner && !hasBannerExpired && (
        <Banner
          variant={bannerVariant ?? "info"}
          message={<Markdown>{bannerText}</Markdown>}
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

          <NavbarNavItems
            onNavClick={() => setExpanded(false)}
            isMobile={false}
          />
        </Label>

        {expanded && (
          <div className={styles.expandedMenu}>
            <NavbarNavItems
              className={styles.expandedMenuLayout}
              onNavClick={() => setExpanded(false)}
              isMobile
            />
          </div>
        )}
      </header>
    </>
  );
};
