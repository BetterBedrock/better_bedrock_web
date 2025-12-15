import { Input } from "@/_components/input";
import { KeyboardEvent, SetStateAction } from "react";

import { styles } from ".";

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
