"use server";

import { fetchAllVouchers } from "@/entities/voucher/fetch-all-vouchers";
import { fetchAllAnalytics } from "@/lib/analytics/fetch-all-analytics";
import { StatisticsList } from "@/pages/panel/analytics/ui/hero/statistics/statistics-list";

import styles from "./statistics.module.scss";

export const Statistics = async () => {
  const vouchers = await fetchAllVouchers();
  const analytics = await fetchAllAnalytics();

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} vouchers={vouchers} />
    </div>
  );
};
