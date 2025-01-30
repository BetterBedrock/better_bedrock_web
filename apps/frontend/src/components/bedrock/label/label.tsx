import styles from "./label.module.css";

interface LabelProps {
  children?: React.ReactNode;
  height?: string;
  width: string;
  minHeight?: string;
}

export const Label= ({ children, width, height, minHeight }: LabelProps) => {
  return (
    <div className={styles.outer_div} style={{ width: width, height: height, minHeight: minHeight}}>
      <div className={styles.inner_div}>
        {children}
      </div>
    </div>
  );
};