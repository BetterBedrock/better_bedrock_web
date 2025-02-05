import { useState } from "react";

import { Label } from "../label";
import { BedrockText } from "../text/bedrock-text";

import SimpleButton from "../simple-button/simple-button";
import FavIcon from "assets/images/favicon.png";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const [expandedNavbar, setExpandedNavbar] = useState(false);

  const handleExpandNavbar = () => {
    setExpandedNavbar((previousExpandedNavbar) => !previousExpandedNavbar);
  };

  return (
    <header id={styles.label_wrapper}>
      <Label width="100%" height="58px">
        <div
          id={styles.container}
          style={{ height: `calc(58px - ((var(--minecraftdepth) * 2)))` }}
        >
          <div id={styles.prefix}>
            <img alt="" src={FavIcon} />
            <BedrockText text="Better Bedrock" type={"h1"} font="MinecraftTen" />
          </div>
          <div id={styles.expand_button}>
            <SimpleButton height={"100%"} onTap={handleExpandNavbar}>
              <i className="material-icons">menu</i>
            </SimpleButton>
          </div>

          <nav id={styles.suffix} data-expanded={expandedNavbar}>
            <ul>
              <li>
                <SimpleButton height={"100%"}>
                  <BedrockText text="Home" type={"p"} textAlign="center" />
                </SimpleButton>{" "}
              </li>
              <li>
                <SimpleButton height={"100%"} onTap={() => {}}>
                  <BedrockText text="Downloads" type={"p"} textAlign="center" />
                </SimpleButton>
              </li>
              <li>
                <SimpleButton height={"100%"}>
                  <BedrockText text="Discord" type={"p"} textAlign="center" />
                </SimpleButton>
              </li>
              <li>
                <SimpleButton height={"100%"}>
                  <BedrockText text="FAQ" type={"p"} textAlign="center" />
                </SimpleButton>
              </li>
            </ul>
          </nav>
        </div>
      </Label>
    </header>
  );
};
