import { AnalyticsDto, VoucherDto, AnalyticsNames } from "@/shared/lib/openapi";
import { StatisticsCard } from "@/widgets/statistics-list";
import { calculateVouchersStatistics } from "@/pages/panel/lib/calculate-vouchers-statistics";

import styles from "./statistics.module.scss";
import { simplifyAnalytics } from "@/entities/analytic";

interface StatisticsListProps {
  analytics: AnalyticsDto[];
  vouchers: VoucherDto[];
}

export const StatisticsList = ({
  vouchers,
  analytics,
}: StatisticsListProps) => {
  const {
    averageVoucherUse,
    averageVoucherUsePercentage,
    validVouchers,
    usedVouchers,
  } = calculateVouchersStatistics({ vouchers });

  const data = simplifyAnalytics({ analytics, type: "general" });

  return (
    <>
      <StatisticsCard
        name={AnalyticsNames.Visits}
        data={data[AnalyticsNames.Visits]}
        className={styles.card}
      />
      <StatisticsCard
        name={AnalyticsNames.UniqueVisits}
        data={data[AnalyticsNames.UniqueVisits]}
        className={styles.card}
      />
      <div className={styles.list}>
        <StatisticsCard
          name="Ads Revenue"
          data={data[AnalyticsNames.AdsRevenue]}
          suffix="€"
          className={styles.card}
        />
        <StatisticsCard
          name="Ads Impressions"
          data={data[AnalyticsNames.AdsImpressions]}
          className={styles.card}
        />
        <StatisticsCard
          name="Total Downloads"
          data={data[AnalyticsNames.TotalDownloads]}
          className={styles.card}
        />
        <StatisticsCard
          name="Generated Downloads"
          data={data[AnalyticsNames.GeneratedDownloads]}
          className={styles.card}
        />
        <StatisticsCard
          name="Ad Downloads"
          data={data[AnalyticsNames.AdDownloads]}
          className={styles.card}
        />
        <StatisticsCard
          name="Voucher Downloads"
          data={data[AnalyticsNames.VoucherDownloads]}
          className={styles.card}
        />
        <StatisticsCard
          name="Average Voucher Use"
          data={parseFloat(averageVoucherUse.toFixed(2))}
          className={styles.card}
        />
        <StatisticsCard
          name="Average Voucher Use %"
          data={parseFloat(averageVoucherUsePercentage.toFixed(2))}
          suffix="%"
          className={styles.card}
        />
        <StatisticsCard
          name="Valid Vouchers"
          data={validVouchers}
          className={styles.card}
        />
        <StatisticsCard
          name="Used Vouchers"
          data={usedVouchers}
          className={styles.card}
        />
        <StatisticsCard
          name="Submitted Projects"
          data={data[AnalyticsNames.SubmittedProjects]}
          className={styles.card}
        />
        <StatisticsCard
          name="Declined Projects"
          data={data[AnalyticsNames.DeclinedProjects]}
          className={styles.card}
        />
        <StatisticsCard
          name="Published Projects"
          data={data[AnalyticsNames.PublishedProjects]}
          className={styles.card}
        />
      </div>
    </>
  );
};
