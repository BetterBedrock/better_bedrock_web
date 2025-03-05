import { BedrockText } from "components/bedrock/text";
import { Button } from "components/bedrock/button";

import LogoLines from "../../../assets/images/lines.png";
import styles from "./hero.module.css";

export const HeroHeader = () => (
  <div className={styles.headerContainer}>

    <div className={styles.headerLogoContainer}>
      <img id={styles.logo} alt="logo-lines" src={LogoLines} />
      <BedrockText
        type={"h1"}
        text="Better Bedrock"
        color="white"
        font="MinecraftTen"
        textAlign="center"
        extraClassName={styles.headerLogoText}
      />
      <img id={styles.logo} alt="logo-lines-reversed" src={LogoLines} style={{ transform: "scaleX(-1)" }} />
    </div>

    <div className={styles.headerAndActionsContainer}>
      <div className={styles.headerDescription}>
        <BedrockText
          type={"p"}
          textAlign="center"
          color="white"
          text="Is the most powerful, customizable, useful and free Texture Pack available on the majority of platforms!"
        />
      </div>

      <div className={styles.headerActions}>
        <Button
          text="Download Now"
          width={"100%"}
          height={"4rem"}
          outlinePaddingRight="1.75px"
          type="alwaysGreen"
        />
        <Button
          text="Join Discord"
          width={"100%"}
          height={"4rem"}
          outlinePaddingLeft="1.75px"
          type="alwaysWhite"
        />
      </div>
    </div>

  </div>
);
