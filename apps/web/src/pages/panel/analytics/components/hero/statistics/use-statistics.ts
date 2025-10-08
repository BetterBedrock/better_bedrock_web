import { useEffect, useState } from "react";
import { AnalyticsDto, VoucherDto } from "~/lib/api";
import { useAnalytics } from "~/providers/analytics";
import { useAuth } from "~/providers/auth";
import { useVoucher } from "~/providers/voucher";

export const useStatistics = () => {

    const { fetchAnalytics } = useAnalytics();
    const { user } = useAuth();
    const { fetchVouchers } = useVoucher();
    const [analytics, setAnalytics] = useState<AnalyticsDto[] | undefined>();
    const [vouchers, setVouchers] = useState<VoucherDto[] | undefined>();

    const fetchData = async () => {
        setAnalytics(await fetchAnalytics() ?? []);
        setVouchers(await fetchVouchers() ?? []);
    }

    useEffect(() => {
        if (user && user.admin) {
            fetchData();
        }
    }, [user]);

    return { analytics, vouchers };
}