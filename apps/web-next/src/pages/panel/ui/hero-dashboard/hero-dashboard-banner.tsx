import { Card } from "@/shared/ui/card";

import styles from "./hero-dashboard.module.scss";
import { SettingsBanner } from "@/pages/panel/ui/hero-dashboard/settings/banner/settings-banner";

export const HeroDashboardBanner = () => (
  <Card className={styles.card} sub>
    <Card.Body>
      <Card.Item className={styles.mods}>
        <SettingsBanner />
      </Card.Item>
    </Card.Body>
  </Card>
);
