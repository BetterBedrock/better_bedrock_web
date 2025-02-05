import { BedrockText } from "../../bedrock/text/bedrock-text";
import CustomUis from "../../../assets/images/banners/custom_uis.png";

import styles from "./about.module.css";

export const AboutCustomUis = () => (
  <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
    <div className={styles.content}>
      <BedrockText
        text="Custom UIS"
        type={"h1"}
        font="MinecraftTen"
        color="white"
        textAlign="center"
      ></BedrockText>
      <BedrockText
        text="Most main screens have been rewritten to match new upcoming Minecraft UI, the OreUI."
        type={"p"}
        font="Mojangles"
        color="white"
        textAlign="center"
      ></BedrockText>
    </div>
    <img alt="" src={CustomUis}></img>
  </div>
);
