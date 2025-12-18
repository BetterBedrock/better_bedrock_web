import { VoucherCard } from "@/_components/voucher-card";
import { VoucherDto } from "@/_lib/api";

interface VouchersListProps {
  vouchers: VoucherDto[];
  handlePreviewVoucher: (voucher: VoucherDto) => Promise<void>;
}

export const VouchersList = ({ vouchers, handlePreviewVoucher }: VouchersListProps) =>
  vouchers.map((voucher) => (
    <VoucherCard
      key={voucher.id}
      voucher={voucher}
      onClick={async () => handlePreviewVoucher(voucher)}
    />
  ));
