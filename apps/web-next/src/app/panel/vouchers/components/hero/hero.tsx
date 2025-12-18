import { Header } from "./header/header";
import { Vouchers } from "./vouchers/vouchers";
import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.wrapper}>
    <Header />
    <Vouchers />
  </div>
);
