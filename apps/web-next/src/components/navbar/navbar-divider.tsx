import styles from "./navbar.module.scss";

interface NavbarDividerProps {
  type?: "vertical" | "horizontal";
}

export const NavbarDivider = ({type = "vertical"}: NavbarDividerProps) => (
  <div className={type === "vertical" ? styles.verticalDivider : styles.horizontalDivider}>
  </div>
);