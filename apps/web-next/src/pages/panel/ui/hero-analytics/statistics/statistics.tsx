"use server";

import { StatisticsList } from "@/pages/panel/ui/hero-analytics/statistics/statistics-list";

import styles from "./statistics.module.scss";
import { fetchAllAnalytics } from "@/entities/analytic";
import { fetchAllVouchers } from "@/pages/panel/api/fetch-all-vouchers";

export const Statistics = async () => {
  const vouchers = await fetchAllVouchers();
  const analytics = await fetchAllAnalytics();

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} vouchers={vouchers} />
    </div>
  );
};
