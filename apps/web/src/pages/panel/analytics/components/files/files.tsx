import { Header } from "./header";
import { Statistics } from "./statistics";
import { styles } from ".";

export const Files = () => (
  <div className={styles.wrapper}>
    <Header />
    <Statistics />
  </div>
);
