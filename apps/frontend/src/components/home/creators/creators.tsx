import { CreatorsHeader } from "./creators-header";
import { DynamicPageItem } from "components/bedrock/page-container/dynamic-page-item";
import Footer from "../../bedrock/Footer";

import styles from "./creators.module.css";
import homeStyles from "pages/home/home.module.css";

export const Creators = () => (
  <DynamicPageItem backgroundUrl={require("../../../assets/images/crosshair_backgrounds/10.png")}>
    <div className={homeStyles.page_content_wrapper}>
      <CreatorsHeader />
    </div>
    <Footer />
  </DynamicPageItem>
);
