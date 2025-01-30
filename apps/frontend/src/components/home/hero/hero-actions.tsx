import { Button } from "components/bedrock/button";

import homeStyles from "pages/home/home.module.css";
import styles from "./hero.module.css";

export const HeroActions = () => (
  <div className={homeStyles.page_element}>
    <div id={styles.actions}>
      <Button
        text="Download"
        width={"100%"}
        height={"48px"}
        outlinePaddingRight="1.75px"
        type="alwaysGreen"
      ></Button>
      <Button
        text="Discord"
        width={"100%"}
        height={"48px"}
        outlinePaddingLeft="1.75px"
        type="alwaysWhite"
      ></Button>
    </div>
  </div>
);
