import styles from "./label.module.css";

interface LabelProps {
  children?: React.ReactNode;
  height?: string;
  width?: string;
  minHeight?: string;
  type?: "green" | "white";
}

export const Label = ({ children, width = "100%", height = "auto", minHeight, type = "white" }: LabelProps) => {
  return (
    <div outer-data-type={type} className={styles.outer_div} style={{ width: width, height: height, minHeight: minHeight }}>
      <div inner-data-type={type} className={styles.inner_div}>
        {children}
      </div>
    </div>
  );
};