import clsx from "clsx";
import styles from "./header.module.scss";

interface HeaderStripesProps {
  side: "left" | "right";
}

export const HeaderStripes = ({ side }: HeaderStripesProps) => (
  <div className={clsx(styles.stripes, styles[side])}>
    <div className={styles.first}></div>
    <div className={styles.second}></div>
    <div className={styles.third}></div>
  </div>
);
