import { PreviewPopupVoucherAction } from "@/pages/project/ui/project-download/preview-popup/preview-popup-voucher/preview-popup-voucher-action";
import { PreviewPopupVoucherInput } from "@/pages/project/ui/project-download/preview-popup/preview-popup-voucher/preview-popup-voucher-input";
import styles from "./preview-popup-voucher.module.scss";
import { KeyboardEvent, SetStateAction } from "react";

interface PreviewPopupVoucherProps {
  voucherCode: string;
  setVoucherCode: (value: SetStateAction<string>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => Promise<void>;
  activate: () => Promise<void>;
}

export const PreviewPopupVoucher = ({
  voucherCode,
  setVoucherCode,
  handleKeyDown,
  activate,
}: PreviewPopupVoucherProps) => (
  <div className={styles.voucher}>
    <PreviewPopupVoucherInput
      voucherCode={voucherCode}
      setVoucherCode={setVoucherCode}
      handleKeyDown={handleKeyDown}
    />
    <PreviewPopupVoucherAction activate={activate} />
  </div>
);
