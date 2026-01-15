import { VoucherCard } from "@/pages/panel/vouchers/ui/hero/voucher-card";
import { VoucherDto } from "@/shared/api/openapi";

interface VouchersListProps {
  vouchers: VoucherDto[];
  handlePreviewVoucher: (voucher: VoucherDto) => Promise<void>;
}

export const VouchersList = ({
  vouchers,
  handlePreviewVoucher,
}: VouchersListProps) =>
  vouchers.map((voucher) => (
    <VoucherCard
      key={voucher.id}
      voucher={voucher}
      onClick={async () => handlePreviewVoucher(voucher)}
    />
  ));
