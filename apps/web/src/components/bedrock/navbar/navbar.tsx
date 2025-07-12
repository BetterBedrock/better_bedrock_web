import { useState } from "react";
import { useLocation } from "react-router-dom";

import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Label } from "../label";
import FavIcon from "~/assets/images/favicon.png";
import { SimpleButton } from "~/components/bedrock/simple-button/simple-button";

import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Link } from "~/components/link";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);
  const location = useLocation();

  const handleExpandNavbar = () => {
    setExpandedNavbar((prev) => !prev);
  };

  // Determine which nav items to show
  const isPanelSection = location.pathname === "/panel" || location.pathname.startsWith("/panel/");
  const navItems = isPanelSection
    ? [
        { name: "Dashboard", path: "/panel" },
        { name: "Analytics", path: "/panel/analytics" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Downloads", path: "/downloads" },
        { name: "Information", path: "/information" },
        { name: "Discord", path: "/discord" },
      ];

  return (
    <header className={styles.wrapper}>
      <Label extraClassName={clsx(styles.label, expandedNavbar && styles.expanded)}>
        <div className={styles.item}>
          <img alt="logo" src={FavIcon} className={styles.image} />
          <BedrockText
            text="Better Bedrock"
            type="h1"
            font="MinecraftTen"
            extraClassName={styles.heading}
          />
          <SimpleButton height="100%" onTap={handleExpandNavbar} className={styles.menuButton}>
            <div className="material-icons">menu</div>
          </SimpleButton>
        </div>

        <nav className={clsx(styles.item, styles.nav)}>
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link link={path}>
                <SimpleButton
                  key={name}
                  width="100%"
                  style={{
                    backgroundColor: isActive ? "var(--bedrock-simple-button-click)" : "",
                  }}
                  className={styles.button}
                  onTap={() => {
                    handleExpandNavbar();
                  }}
                >
                  <BedrockText text={name} type="p" extraClassName={styles.text} />
                </SimpleButton>
              </Link>
            );
          })}
        </nav>
      </Label>
    </header>
  );
};
