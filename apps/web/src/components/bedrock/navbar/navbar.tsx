import { useState } from "react";
import { useLocation } from "react-router-dom";

import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Label } from "../label";
import FavIcon from "~/assets/images/favicon.png";
import { SimpleButton } from "~/components/bedrock/simple-button/simple-button";

import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";
import { useAuth } from "~/providers/auth";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);
  const location = useLocation();
  const { authenticated } = useAuth();

  const handleExpandNavbar = (value?: boolean) => {
    setExpandedNavbar((prev) => (value !== undefined ? value : !prev));
  };

  // Determine which nav items to show
  const isPanelSection = location.pathname === "/panel" || location.pathname.startsWith("/panel/");
  const navItems =
    isPanelSection && authenticated
      ? [
          { name: "Dashboard", path: "/panel" },
          { name: "Analytics", path: "/panel/analytics" },
          { name: "Voucher", path: "/panel/voucher" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Downloads", path: "/downloads/main" },
          { name: "Information", path: "/information" },
          { name: "Discord", path: "/discord" },
        ];

  return (
    <header className={styles.wrapper}>
      <Label extraClassName={clsx(styles.label, expandedNavbar && styles.expanded)}>
        <div className={clsx(styles.item, styles.mobile)}>
          <Link className={clsx(styles.item)} link={Routes.HOME} hideStyles>
            <img alt="logo" src={FavIcon} className={styles.image} />
            <BedrockText
              text="Better Bedrock"
              type="h1"
              font="MinecraftTen"
              extraClassName={styles.heading}
            />
          </Link>
          <SimpleButton height="100%" onTap={handleExpandNavbar} className={styles.menuButton}>
            <div className={clsx("material-icons", styles.menu)}>menu</div>
          </SimpleButton>
        </div>

        <div className={clsx(styles.item, styles.links)}>
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <nav className={styles.nav}>
                <Link link={path} hideStyles={true}>
                  <SimpleButton
                    key={name}
                    width="100%"
                    className={clsx(styles.button, isActive && styles.active)}
                    onTap={() => {
                      handleExpandNavbar(false);
                    }}
                  >
                    <BedrockText text={name} type="p" extraClassName={styles.text} />
                  </SimpleButton>
                </Link>
              </nav>
            );
          })}
        </div>
      </Label>
    </header>
  );
};
