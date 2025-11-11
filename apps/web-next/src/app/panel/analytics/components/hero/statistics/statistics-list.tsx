import { AnalyticsDto, VoucherDto, AnalyticsNames } from "@/_lib/api";
import {
  calculateEstimatedProfit,
  calculateVouchersStatistics,
  styles,
} from ".";
import { StatisticsCard } from "@/_components/statistics-card";
import { simplifyAnalytics } from "@/_lib/analytics";

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
  const estimatedProfit = calculateEstimatedProfit({ data });

  return (
    <>
      <StatisticsCard
        name={AnalyticsNames.Visits}
        data={data[AnalyticsNames.Visits]}
        className={styles.card}
      />
      <StatisticsCard
        name="Ads Estimated Revenue"
        data={parseFloat(estimatedProfit.toFixed(2))}
        suffix="€"
        showGraph={false}
        className={styles.card}
      />
      <div className={styles.list}>
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
