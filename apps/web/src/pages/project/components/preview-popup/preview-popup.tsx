import { Popup } from "~/components/bedrock/popup";
import {
  PreviewPopupFooter,
  PreviewPopupPlans,
  PreviewPopupRecommended,
  PreviewPopupTabs,
  PreviewPopupVoucher,
  useVoucherManager,
} from ".";
import { CardDivider } from "~/components/bedrock/card";
import { ProjectDto, VoucherDto } from "~/lib/api";

interface PreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const PreviewPopup = ({ onClose, project }: PreviewPopupProps) => {
  const {
    categories,
    handleKeyDown,
    selectedTimeframe,
    setSelectedTimeframe,
    voucherCode,
    setVoucherCode,
    useVoucher,
    download,
    cookie,
    getLinkvertiseId,
  } = useVoucherManager({ project, onClose });

  if (cookie.voucher || selectedTimeframe === undefined) {
    if (cookie.voucher satisfies VoucherDto) {
      const bbOnly = cookie.voucher.betterBedrockContentOnly;
      if (!bbOnly || (project.betterBedrockContent && bbOnly)) {
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
      <Popup.Wrapper>
        <Popup.Part>
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
          <PreviewPopupRecommended categories={categories} />
        </Popup.Part>

        <CardDivider />
        <PreviewPopupPlans
          categories={categories}
          selectedTimeframe={selectedTimeframe}
          download={download}
          getLinkvertiseId={getLinkvertiseId}
        />
        <CardDivider />
        <PreviewPopupFooter />
      </Popup.Wrapper>
    </Popup>
  );
};
