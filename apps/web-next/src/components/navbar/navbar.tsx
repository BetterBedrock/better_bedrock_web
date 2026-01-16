"use client";

import { useState } from "react";
import { Label } from "../label";
import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Banner } from "@/components/banner";
import { BedrockText } from "@/components/bedrock-text";
import { SimpleButton } from "@/components/simple-button";
import { Link } from "@/components/link";
import { useAuth } from "@/providers/auth";
import { Routes } from "@/utils/routes";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
              <Image src="/svgs/menu.svg" height={24} width={24} alt="menu" />
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
        {expandedNavbar && <div className={styles.expandedMenu}>{mobileLayout}</div>}
      </header>
    </>
  );
};
