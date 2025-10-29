"use client";

import { useState } from "react";

import { Label } from "../label";
import FavIcon from "@/public/images/favicon.png";

import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Banner } from "@/_components/banner";
import { BedrockText } from "@/_components/bedrock-text";
import { SimpleButton } from "@/_components/simple-button";
import { Link } from "@/_components/link";
import { useAuth } from "@/_providers/auth";
import { Routes } from "@/utils/routes";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);
  const location = usePathname();
  const { user } = useAuth();

  const handleExpandNavbar = (value?: boolean) => {
    setExpandedNavbar((prev) => (value !== undefined ? value : !prev));
  };

  // Determine which nav items to show
  const isPanelSection =
    location === "/panel" || location.startsWith("/panel/");
  const navItems =
    isPanelSection && user?.admin
      ? [
          { name: "Dashboard", path: "/panel" },
          { name: "Analytics", path: "/panel/analytics" },
          { name: "Vouchers", path: "/panel/vouchers" },
          { name: "Projects", path: "/panel/projects" },
          { name: "Reports", path: "/panel/reports" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Downloads", path: "/downloads/main" },
          { name: "Information", path: "/information/:general" },
          user
            ? { name: "Profile", path: `/profile/${user.name}/:projects` }
            : { name: "Login", path: "/login" },
        ];

  return (
    <>
      {process.env.VITE_FRONTEND_URL === "dev.betterbedrock.com" && (
        <Banner
          type="info"
          message="This is a developer version of Better Bedrock Website"
        />
      )}
      <header className={styles.wrapper}>
        <Label
          className={clsx(styles.label, expandedNavbar && styles.expanded)}
        >
          <div className={clsx(styles.item, styles.mobile)}>
            <Link className={clsx(styles.item)} link={Routes.HOME} hideStyles>
              <img alt="logo" src={FavIcon.src} className={styles.image} />
              <BedrockText
                text="Better Bedrock"
                type="p"
                font="Minecraft"
                headerSize
                extraClassName={styles.heading}
              />
            </Link>
            <SimpleButton
              height="100%"
              onTap={handleExpandNavbar}
              className={styles.menuButton}
              isClicked={expandedNavbar}
            >
              <div className={clsx("material-icons", styles.menu)}>menu</div>
            </SimpleButton>
          </div>

          <div className={clsx(styles.item, styles.links)}>
            {navItems.map(({ name, path }) => {
              const navPaths = path.split("/");
              const locationPaths = location.split("/");

              let finalNavPath;

              if (navPaths[1] === locationPaths[1]) {
                finalNavPath = navPaths
                  .map((p, index) =>
                    p.startsWith(":")
                      ? (locationPaths[index] ?? p.replace(":", ""))
                      : p
                  )
                  .join("/");
              } else {
                finalNavPath = navPaths
                  .map((p) => (p.startsWith(":") ? p.replace(":", "") : p))
                  .join("/");
              }

              const isActive = location === finalNavPath;

              return (
                <nav key={path} className={styles.nav}>
                  <Link link={finalNavPath} hideStyles={true}>
                    <SimpleButton
                      key={name}
                      width="100%"
                      isClicked={isActive}
                      className={styles.button}
                      onTap={() => {
                        handleExpandNavbar(false);
                      }}
                    >
                      <BedrockText
                        text={name}
                        type="p"
                        extraClassName={styles.text}
                      />
                    </SimpleButton>
                  </Link>
                </nav>
              );
            })}
          </div>
        </Label>
      </header>
    </>
  );
};
