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

  const handleExpandNavbar = () => {
    setExpandedNavbar((prev) => !prev);
  };

  const navigate = useNavigate()

  const navButtons = ["Home", "Downloads", "Discord", "Information"]
  const navRoutes = ["/", "/downloads", "/discord", "/information"]

  const minWidth = useMediaQuery({ query: '(max-width: 700px)' })
  const minWidthNav = useMediaQuery({ query: '(max-width: 370px)' })
  const minWidthNav2 = useMediaQuery({ query: '(max-width: 230px)' })

  return (
    <header className={styles.label_wrapper} id="navbar">

      <Label height={minWidth ? "auto" : "4rem"} >
        <div id={styles.containerColumn} style={{ height: minWidth ? "auto" : "100%" }}>

          <div id={styles.containerRow} >
            <div id={styles.prefix}>
              <img alt="logo" src={FavIcon} />
              {!minWidthNav && (<BedrockText text="Better Bedrock" type={"h1"} font="MinecraftTen" />)}
            </div>


            {(minWidthNav && !minWidthNav2) && (<BedrockText text="Better Bedrock" type={"h1"} font="MinecraftTen" />)}

            {minWidth && (
              <div id={styles.menuButton}>
                <SimpleButton height={"100%"} onTap={handleExpandNavbar}>
                  <div className="material-icons">menu</div>
                </SimpleButton>
              </div>
            )}

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
                      onTap={() => { navigate(navRoutes[index]) }}
                      key={item}
                    >
                      <BedrockText text={item} type={"p"} />
                    </SimpleButton>
                  )
                })}
              </nav>
            )}
          </div>

          {(minWidth && expandedNavbar) && (
            <nav className={styles.menuContainer}>
              {navButtons.map((item, index) => {
                const isActive = location.pathname === navRoutes[index];
                return (
                  <SimpleButton height={"auto"} width={"100%"} style={{ padding: "0.5rem 0", backgroundColor: isActive ? "var(--bedrock-simple-button-click)" : "" }} onTap={() => { navigate(navRoutes[index]) }} key={item}>
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
