import Logo from "../../../assets/images/logo.png";
import styles from "./hero.module.css";
import homeStyles from "pages/home/home.module.css";

export const HeroLogo = () => (
  <div className={homeStyles.page_element}>
    <img id={styles.logo} alt="Logo" src={Logo}/>
  </div>
);
