"use server";

import { fetchAllVouchers } from "@/lib/voucher/fetch-all-vouchers";
import { fetchAllAnalytics } from "@/lib/analytics/fetch-all-analytics";
import { StatisticsList } from "@/app/(admin)/panel/analytics/components/hero/statistics/statistics-list";

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
