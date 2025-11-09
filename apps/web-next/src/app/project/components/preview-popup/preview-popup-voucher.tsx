import { Input } from "@/_components/input";
import { KeyboardEvent, SetStateAction } from "react";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";

import { styles } from ".";

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
    <Input
      placeholder="Voucher Code"
      className={styles.input}
      value={voucherCode}
      onKeyDown={handleKeyDown}
      onChange={(e) => setVoucherCode(e.target.value)}
    />
    <Button type="dark" onClick={activate} center>
      <BedrockText color="white" type="p" text="Apply" extraClassName={styles.apply} />
    </Button>
  </div>
);
