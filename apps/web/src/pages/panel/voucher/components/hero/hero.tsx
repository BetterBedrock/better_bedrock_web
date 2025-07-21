import { Header } from "./header";
import { Statistics } from "./statistics";
import { styles } from ".";

export const Hero = () => (
  <div className={styles.wrapper}>
    <Header />
    <Statistics />
  </div>
);
