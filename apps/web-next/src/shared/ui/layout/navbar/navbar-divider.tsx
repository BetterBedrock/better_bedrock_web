import styles from "./navbar.module.scss";

export const NavbarDivider = ({ type = "vertical" }: { type?: "vertical" | "horizontal" }) => (
  <div className={type === "vertical" ? styles.verticalDivider : styles.horizontalDivider} />
);