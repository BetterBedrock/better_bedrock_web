import { Input } from "@/shared/ui/input";
import { KeyboardEvent, SetStateAction } from "react";

import styles from "./preview-popup-voucher.module.scss";

interface PreviewPopupVoucherInputProps {
  voucherCode: string;
  setVoucherCode: (value: SetStateAction<string>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

export const PreviewPopupVoucherInput = ({
  voucherCode,
  setVoucherCode,
  handleKeyDown,
}: PreviewPopupVoucherInputProps) => (
  <Input
    placeholder="Voucher Code"
    className={styles.input}
    value={voucherCode}
    onKeyDown={handleKeyDown}
    onChange={(e) => setVoucherCode(e.target.value)}
  />
);
