import { useState } from "react";

import { Label } from "../label";
import { BedrockText } from "../text/bedrock-text";
import { useMediaQuery } from 'react-responsive'

import SimpleButton from "../simple-button/simple-button";
import FavIcon from "assets/images/favicon.png";

import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);
  const navigate = useNavigate()

  const handleExpandNavbar = () => {
    setExpandedNavbar((prev) => !prev);
  };


  const navButtons = ["Home", "Downloads", "Information", "Discord"]
  const navRoutes = ["/", "/downloads", "/information", "https://discord.gg/ZGK5WYXnEY"]

  const minWidth = useMediaQuery({ query: '(max-width: 700px)' })
  const minWidthNav = useMediaQuery({ query: '(max-width: 350px)' })
  const minWidthNav2 = useMediaQuery({ query: '(max-width: 230px)' })

  return (
    <header className={styles.label_wrapper} id="navbar">

      <Label height={minWidth ? "auto" : "4rem"} >
        <div id={styles.containerColumn} style={{ height: minWidth ? "auto" : "100%" }}>

          {/* logo with text */}
          <div id={styles.containerRow} >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} onClick={() => { navigate(navRoutes[0]) }}>
              <div id={styles.prefix}>
                <img alt="logo" src={FavIcon} />
                {!minWidthNav && (<BedrockText text="Better Bedrock" type={"h1"} font="MinecraftTen" style={{ fontSize: "clamp(30px, 4vw, 2.5rem)" }} />)}
              </div>
              {(minWidthNav && !minWidthNav2) && (<BedrockText text="Better Bedrock" type={"h1"} font="MinecraftTen" />)}
            </div>

            {/* menu button on the rigth */}
            {minWidth && (
              <div id={styles.menuButton}>
                <SimpleButton height={"100%"} onTap={handleExpandNavbar}>
                  <div className="material-icons">menu</div>
                </SimpleButton>
              </div>
            )}

            {/* desktop nav buttons */}
            {!minWidth && (
              <nav id={styles.suffix}>
                {navButtons.map((item, index) => {
                  const isActive = location.pathname === navRoutes[index];
                  return (
                    <SimpleButton
                      height={"100%"}
                      style={{
                        padding: "0 0.5rem",
                        backgroundColor: isActive ? "var(--bedrock-simple-button-click)" : ""
                      }}
                      onTap={() => {
                        if (index === 3) {
                          window.open(navRoutes[index], "_blank", "noopener,noreferrer");
                        } else {
                          navigate(navRoutes[index]);
                        }
                      }}
                      key={item}
                    >
                      <BedrockText text={item} type={"p"} />
                    </SimpleButton>
                  )
                })}
              </nav>
            )}
          </div>

          {/* mobile nav buttons */}
          {(minWidth && expandedNavbar) && (
            <nav className={styles.menuContainer}>
              {navButtons.map((item, index) => {
                const isActive = location.pathname === navRoutes[index];
                return (
                  <SimpleButton height={"auto"} width={"100%"} style={{ padding: "0.5rem 0", backgroundColor: isActive ? "var(--bedrock-simple-button-click)" : "" }} onTap={() => {
                    if (index === 3) {
                      window.open(navRoutes[index], "_blank", "noopener,noreferrer");
                    } else {
                      navigate(navRoutes[index]);
                    }
                    setExpandedNavbar(false)
                  }} key={item}>
                    <BedrockText text={item} type={"p"} />
                  </SimpleButton>
                )
              })}
            </nav>
          )}

        </div>

      </Label>

    </header >
  );
};
