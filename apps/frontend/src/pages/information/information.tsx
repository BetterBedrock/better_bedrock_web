import { useState } from "react";
import Footer from "../../components/bedrock/Footer";
import { StaticPage } from "components/bedrock/page-container/static-page";
import backgroundImg from "../../assets/images/crosshair_backgrounds/11.png";
import { Header } from "../../components/information/header"
import { Faq } from "../../components/information/faq"
import { TutorialVideos } from "../../components/information/tutorial-videos"
import styles from "./information.module.css";

export const Information = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <StaticPage backgroundUrl={backgroundImg} id="information">
        <div className={styles.container}>

          <Header tabNames={TAB_NAMES} activeTab={activeTab} setActiveTab={setActiveTab} />
          <Faq activeTab={activeTab} />
          <TutorialVideos activeTab={activeTab} />
          <TutorialVideos activeTab={activeTab} section="deprecated" />

        </div>
      </StaticPage >
      <Footer />
    </>
  );
};

const TAB_NAMES: string[] = ["General", "Mobile Devices", "PC/Other Devices"];
export type Sections = "general" | "mobile" | "pc";
export const ALL_SECTIONS: Sections[] = ["general", "mobile", "pc"];
