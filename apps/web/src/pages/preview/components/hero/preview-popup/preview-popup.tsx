import { Popup } from "~/components/bedrock/popup";
import { styles } from "..";
import { CardDivider } from "~/components/bedrock/card";
import { DownloadsItemDto, VoucherDto } from "~/lib/api";
import { PreviewPopupFooter } from "~/pages/preview/components/hero/preview-popup/preview-popup-footer";
import { PreviewPopupPlans } from "~/pages/preview/components/hero/preview-popup/preview-popup-plans";
import { PreviewPopupRecommended } from "~/pages/preview/components/hero/preview-popup/preview-popup-recommended";
import { PreviewPopupTabs } from "~/pages/preview/components/hero/preview-popup/preview-popup-tabs";
import { PreviewPopupVoucher } from "~/pages/preview/components/hero/preview-popup/preview-popup-voucher";
import { usePreviewPopup } from "~/pages/preview/components/hero/preview-popup/use-preview-popup";

interface PreviewPopupProps {
  downloadItem: DownloadsItemDto;
  onClose?: () => void;
}

export const PreviewPopup = ({ onClose, downloadItem }: PreviewPopupProps) => {
  const {
    categories,
    handleKeyDown,
    selectedTimeframe,
    setSelectedTimeframe,
    voucherCode,
    setVoucherCode,
    useVoucher,
    download,
    purchase,
    cookie,
  } = usePreviewPopup({ downloadItem });

  if (cookie.voucher || selectedTimeframe === undefined) {
    if (cookie.voucher satisfies VoucherDto) {
      if (!cookie.voucher.betterBedrockContentOnly) {
        if (onClose) onClose!();
        return <></>;
      }
    }
    if (!cookie.voucher) {
      return <></>;
    }
  }

  return (
    <Popup onClose={onClose} title="Download Method">
      <div className={styles.container}>
        <div className={styles.part} style={{ paddingBottom: 0 }}>
          <PreviewPopupTabs
            categories={categories}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
          />
          <PreviewPopupVoucher
            voucherCode={voucherCode}
            setVoucherCode={setVoucherCode}
            handleKeyDown={handleKeyDown}
            useVoucher={useVoucher}
          />
        </div>
        <PreviewPopupRecommended categories={categories} purchase={purchase} />
        <CardDivider />
        <PreviewPopupPlans
          categories={categories}
          selectedTimeframe={selectedTimeframe}
          download={download}
          purchase={purchase}
        />
        <CardDivider />
        <PreviewPopupFooter />
      </div>
    </Popup>
  );
};
