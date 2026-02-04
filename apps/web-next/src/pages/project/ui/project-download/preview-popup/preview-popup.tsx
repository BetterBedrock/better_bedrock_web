"use client";

import { Popup } from "@/shared/ui/popup";
import { ProjectDto } from "@/shared/lib/openapi";
import { useVoucherManager } from "@/pages/project/model/use-voucher-manager";
import { PreviewPopupFooter } from "@/pages/project/ui/project-download/preview-popup/preview-popup-footer/preview-popup-footer";
import { PreviewPopupPlans } from "@/pages/project/ui/project-download/preview-popup/preview-popup-plans/preview-popup-plans";
import { PreviewPopupRecommended } from "@/pages/project/ui/project-download/preview-popup/preview-popup-recommended";
import { PreviewPopupTabs } from "@/pages/project/ui/project-download/preview-popup/preview-popup-tabs";
import { PreviewPopupVoucher } from "@/pages/project/ui/project-download/preview-popup/preview-popup-voucher/preview-popup-voucher";

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
  } = useVoucherManager({ project, onClose });

  return (
    <Popup onClose={onClose} title="Download Method">
      <Popup.Body>
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
        <PreviewPopupPlans
          categories={categories}
          selectedTimeframe={selectedTimeframe}
          download={download}
        />
        <PreviewPopupFooter />
      </Popup.Body>
    </Popup>
  );
};
