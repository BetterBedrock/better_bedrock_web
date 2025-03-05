import { PageImageWrapper } from "components/bedrock/page-image-wrapper";
import Footer from "../../bedrock/Footer";
import { CreatorsHeader } from "./creators-header";

import styles from "./creators.module.css";
import homeStyles from "pages/home/home.module.css";
import { CreatorsTrailer } from "./creators-trailer";

export const Creators = () => (
  <section>
    <PageImageWrapper backgroundUrl={require("../../../assets/images/crosshair_backgrounds/3.png")}>
      <div className={homeStyles.page_content_wrapper}>
        <CreatorsTrailer />
        <CreatorsHeader />
      </div>
      <Footer width="100%"></Footer>
    </PageImageWrapper>
  </section>
);
