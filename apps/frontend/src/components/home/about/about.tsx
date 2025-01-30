import { Slideshow } from "components/bedrock/slideshow";
import { AboutCustomUis } from "./about-custom-uis";
import { AboutModMenu } from "./about-mod-menu";
import styles from "./about.module.css";
import homeStyles from "pages/home/home.module.css";

export const About = () => (
  <section id={styles.wrapper}>
    <div className={homeStyles.page_content_wrapper}>
      {/* <Slideshow>
        <AboutModMenu />
        <AboutCustomUis />
      </Slideshow> */}
      <div style={{display: "flex", flexDirection: "column"}}>
        <AboutModMenu />
        <AboutCustomUis />
      </div>
    </div>
  </section>
);
