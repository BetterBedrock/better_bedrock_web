import { VoucherDto } from "@/shared/api/openapi";
import dayjs from "dayjs";

interface CalculateVouchersStatisticsProps {
    vouchers: VoucherDto[];
}

export const calculateVouchersStatistics = ({
    vouchers,
}: CalculateVouchersStatisticsProps) => {
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
            dayjs().isBefore(voucher.expiresAt) &&
            voucher.downloadCount < voucher.maxDownloads,
    ).length;

    const usedVouchers = vouchers.length - validVouchers;

    return {
        averageVoucherUse,
        averageVoucherUsePercentage,
        validVouchers,
        usedVouchers,
    };
};
