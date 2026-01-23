import { Header } from "./header/header";
import { Vouchers } from "./vouchers/vouchers";
import styles from "./hero-vouchers.module.scss";

export const HeroVouchers = () => (
  <div className={styles.wrapper}>
    <Header />
    <Vouchers />
  </div>
);
