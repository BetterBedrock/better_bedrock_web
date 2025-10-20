import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";
import { styles } from ".";
import { KeyboardEvent, SetStateAction } from "react";

interface PreviewPopupVoucherProps {
  voucherCode: string;
  setVoucherCode: (value: SetStateAction<string>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => Promise<void>;
  useVoucher: () => Promise<void>;
}

export const PreviewPopupVoucher = ({
  voucherCode,
  setVoucherCode,
  handleKeyDown,
  useVoucher,
}: PreviewPopupVoucherProps) => (
  <div className={styles.voucher}>
    <Input
      placeholder="Voucher Code"
      className={styles.input}
      value={voucherCode}
      onKeyDown={handleKeyDown}
      onChange={(e) => setVoucherCode(e.target.value)}
    />
    <Button type="dark" onClick={useVoucher} center>
      <BedrockText color="white" type="p" text="Apply" extraClassName={styles.apply} />
    </Button>
  </div>
);
