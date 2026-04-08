import { HeroDashboardBanner } from "./hero-dashboard-banner";
import { HeroDashboardHeader } from "./hero-dashboard-header";
import styles from "./hero-dashboard.module.scss";

export const HeroDashboard = () => (
  <div className={styles.wrapper}>
    <HeroDashboardHeader />
    <HeroDashboardBanner />
  </div>
);
