// import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { styles } from ".";
import { useAnalytics } from "~/providers/analytics";
import { useVoucher } from "~/providers/voucher";
import dayjs from "dayjs";
import { AnalyticsNames } from "~/lib/api";

export const Statistics = () => {
  const { analytics } = useAnalytics();
  const { vouchers } = useVoucher();

  const categories = analytics
    .filter((value) => value.type === "general")
    .map((value) => value.name);

  const data = categories.reduce((acc: { [key: string]: typeof analytics }, category) => {
    acc[category] = analytics.filter((a) => a.name === category);
    return acc;
  }, {});

  const simplifiedData = Object.keys(data).reduce((acc: { [key: string]: number }, key) => {
    acc[key] = data[key].reduce((sum, p) => sum + p.value, 0) || 0;
    return acc;
  }, {});

  const averageVoucherUse =
    vouchers.reduce((sum, cur) => {
      return sum + cur.downloadCount;
    }, 0) / vouchers.length;

  const averageVoucherUsePercentage =
    vouchers.reduce((sum, cur) => {
      return sum + (cur.downloadCount / cur.maxDownloads) * 100;
    }, 0) / vouchers.length;

  const validVouchers = vouchers.filter(
    (voucher) =>
      dayjs().isBefore(voucher.expiresAt) && voucher.downloadCount < voucher.maxDownloads,
  ).length;

  const usedVouchers = vouchers.length - validVouchers;

  const estimatedProfit = ((simplifiedData["Ad Downloads"] ?? 0) / 1000) * 9;

  return (
    <div className={styles.data}>
      <StatisticsCard name={AnalyticsNames.Visits} data={data[AnalyticsNames.Visits]} className={styles.card} />
      <StatisticsCard
        name="Ads Estimated Revenue"
        data={estimatedProfit}
        suffix="$"
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
        <StatisticsCard name="Ad Downloads" data={data[AnalyticsNames.AdDownloads]} className={styles.card} />
        <StatisticsCard
          name="Voucher Downloads"
          data={data[AnalyticsNames.VoucherDownloads]}
          className={styles.card}
        />
        <StatisticsCard
          name="Average Voucher Use"
          data={averageVoucherUse}
          className={styles.card}
        />
        <StatisticsCard
          name="Average Voucher Use %"
          data={averageVoucherUsePercentage}
          suffix="%"
          className={styles.card}
        />
        <StatisticsCard name="Valid Vouchers" data={validVouchers} className={styles.card} />
        <StatisticsCard
          name="Used Vouchers"
          data={usedVouchers}
          className={styles.card}
        />
      </div>
    </div>
  );
};
