import { VoucherCard } from "@/pages/panel/ui/hero-vouchers/voucher-card";
import { VoucherDto } from "@/shared/lib/openapi";

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
