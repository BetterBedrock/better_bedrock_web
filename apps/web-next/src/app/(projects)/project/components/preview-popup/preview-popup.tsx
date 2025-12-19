"use client";

import { CardDivider } from "@/components/card";
import { Popup } from "@/components/popup";
import { ProjectDto } from "@/lib/api";
import { useVoucherManager } from "@/app/(projects)/project/components/preview-popup/hooks/use-voucher-manager";
import { PreviewPopupFooter } from "@/app/(projects)/project/components/preview-popup/preview-popup-footer/preview-popup-footer";
import { PreviewPopupPlans } from "@/app/(projects)/project/components/preview-popup/preview-popup-plans/preview-popup-plans";
import { PreviewPopupRecommended } from "@/app/(projects)/project/components/preview-popup/preview-popup-recommended";
import { PreviewPopupTabs } from "@/app/(projects)/project/components/preview-popup/preview-popup-tabs";
import { PreviewPopupVoucher } from "@/app/(projects)/project/components/preview-popup/preview-popup-voucher/preview-popup-voucher";

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
    activate,
    download,
    getLinkvertiseId,
  } = useVoucherManager({ project, onClose });

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
            activate={activate}
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
