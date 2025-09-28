import { Unresolved } from "~/pages/panel/reports/components/hero/unresolved";
import { styles } from ".";
import { Header } from "./header";
import { Resolved } from "~/pages/panel/reports/components/hero/resolved";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <Unresolved />
    <Resolved />
  </div>
);
