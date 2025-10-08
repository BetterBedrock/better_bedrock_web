import { Header } from "./header";
import { Vouchers } from "./vouchers";
import { styles } from ".";

export const Hero = () => (
  <div className={styles.wrapper}>
    <Header />
    <Vouchers />
  </div>
);
