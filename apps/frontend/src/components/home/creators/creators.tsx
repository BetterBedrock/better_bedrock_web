import Footer from "../../bedrock/Footer";
import { CreatorsCard } from "./creators-cards";
import { CreatorsHeader } from "./creators-header";

import styles from "./creators.module.css";
import homeStyles from "pages/home/home.module.css";

export const Creators = () => (
  <section id={styles.wrapper}>
    <div className={homeStyles.page_content_wrapper}>
      <CreatorsHeader />
      <CreatorsCard />
    </div>
    <Footer width="100%"></Footer>
  </section>
);
