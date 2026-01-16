import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { Button } from "@/components/button";
import { VoucherDto } from "@/lib/api";

interface VoucherCardProps {
  voucher: VoucherDto;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

export const VoucherCard = ({
  voucher,
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
}: VoucherCardProps) => {
  const isExpired = voucher.expiresAt && new Date(voucher.expiresAt) < new Date();
  return (
    <Button
      width="100%"
      height={height}
      type={isExpired ? "red" : "white"}
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}
    >
      <div className={styles.content}>
        <BedrockText
          text={voucher.code}
          type="h1"
          font="Minecraft"
          textAlign="left"
          extraClassName={styles.price}
          color={isExpired ? "white" : undefined}
        />
        <div className={styles.description}>
          <strong>
            <BedrockText text={voucher.email} type="p" textAlign="left" color={isExpired ? "white" : undefined} />
          </strong>
          <BedrockText
            text={`Usage - ${voucher.downloadCount} / ${voucher.maxDownloads}`}
            type="p2"
            textAlign="left"
            color={isExpired ? "white" : undefined}
          />
        </div>
      </div>
    </Button>
  );
};
