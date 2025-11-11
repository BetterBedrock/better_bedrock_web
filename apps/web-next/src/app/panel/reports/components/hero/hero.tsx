import { Header } from "./header";
import { Resolved } from "@/app/panel/reports/components/hero/resolved";
import { Unresolved } from "@/app/panel/reports/components/hero/unresolved";

import { styles } from ".";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <Unresolved />
    <Resolved />
  </div>
);
