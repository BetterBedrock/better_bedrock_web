"use client";
import { CardDivider } from "@/_components/card";
import { Popup } from "@/_components/popup";
import { ProjectDto, VoucherDto } from "@/_lib/api";

import {
  PreviewPopupFooter,
  PreviewPopupPlans,
  PreviewPopupRecommended,
  PreviewPopupTabs,
  PreviewPopupVoucher,
  useVoucherManager,
} from ".";

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
