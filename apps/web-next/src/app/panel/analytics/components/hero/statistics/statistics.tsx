"use server";

import { styles } from ".";
import { fetchAllVouchers } from "@/_lib/voucher/fetch-all-vouchers";
import { fetchAllAnalytics } from "@/_lib/analytics/fetch-all-analytics";
import { StatisticsList } from "@/app/panel/analytics/components/hero/statistics/statistics-list";

export const Statistics = async () => {
  const vouchers = await fetchAllVouchers();
  const analytics = await fetchAllAnalytics();

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} vouchers={vouchers} />
    </div>
  );
};
