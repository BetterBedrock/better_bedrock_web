"use client";

import { CardDivider } from "@/shared/ui/card";
import { Popup } from "@/shared/ui/popup";
import { ProjectDto } from "@/shared/api/openapi";
import { useVoucherManager } from "@/widgets/project-download/model/use-voucher-manager";
import { PreviewPopupFooter } from "@/widgets/project-download/ui/preview-popup/preview-popup-footer/preview-popup-footer";
import { PreviewPopupPlans } from "@/widgets/project-download/ui/preview-popup/preview-popup-plans/preview-popup-plans";
import { PreviewPopupRecommended } from "@/widgets/project-download/ui/preview-popup/preview-popup-recommended";
import { PreviewPopupTabs } from "@/widgets/project-download/ui/preview-popup/preview-popup-tabs";
import { PreviewPopupVoucher } from "@/widgets/project-download/ui/preview-popup/preview-popup-voucher/preview-popup-voucher";

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
