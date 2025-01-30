import { BedrockText } from "../../bedrock/text/bedrock-text";
import ModMenu from "../../../assets/images/banners/mod_menu.png";

import styles from "./about.module.css";

export const AboutModMenu = () => (
  <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
    <img alt="" src={ModMenu}></img>
    <div className={styles.content}>
      <BedrockText
        text="Mod Menu"
        type={"h2"}
        font="Minecraft"
        color="white"
        textAlign="center"
      ></BedrockText>
      <BedrockText
        text="Includes many adjustable modules and options to customize default HUD elements!"
        type={"p2"}
        font="Mojangles"
        color="white"
        textAlign="center"
      ></BedrockText>
    </div>
  </div>
);
