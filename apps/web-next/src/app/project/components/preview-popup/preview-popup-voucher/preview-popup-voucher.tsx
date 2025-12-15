import { KeyboardEvent, SetStateAction } from "react";
import { styles, PreviewPopupVoucherInput, PreviewPopupVoucherAction } from ".";

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
